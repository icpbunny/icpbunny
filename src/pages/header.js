import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './home';
import Breeding from './breeding';

import { log } from '../common/utils';

const icpwallet = require('../common/ICPPlugWallet');
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      close: true,

      wallet: 'Plug',

      isPlugExtensionAvailable: true,
      isPlugConnectionAllowed: true,

      principalID: '',

      headersData: {
        nHolders: 0,
        nTransfers: 0,

        nCarrots: 0,
        nCarrotsDisplay: 0,

        nTotalCarrotsSupply: 0,
        nTotalCarrotHolders: 0,
      },

      loading: true,
    };
  }
  handleClick = () => {
    this.setState({
      close: !this.state.close,
    });
  };

  componentDidMount() {
    this.getDataForInitialize();
  }

  getDataForInitialize = async () => {
    // 1 Initialize
    let result = 0;

    if (this.state.wallet === 'Plug') {
      result = await icpwallet.initPlugWallet();
    } else {
      result = await icpwallet.initStoicWallet();
    }

    if (result === 0 && this.state.wallet === 'Plug') {
      this.setState({ isPlugExtensionAvailable: false });
      return;
    } else if (result === -1) {
      this.setState({ isPlugConnectionAllowed: false });
      return;
    } else {
      this.setState({ isPlugConnectionAllowed: true });

      const tempPrincipal = icpwallet.getPrincipal();
      log('tempPrincipal = ' + tempPrincipal);
      this.setState({ principalID: tempPrincipal });
      this.getAllData();
    }
  };

  async getAllData2() {
    this.setState({
      loading: true,
    });

    const imageData = await icpwallet.getBunniesImageData();
    this.setState({
      detailsArray: imageData,
    });

    this.setState({
      loading: false,
    });

    const detailsArray = await icpwallet.getBunniesPropertiesData();
    this.setState({
      detailsArray: detailsArray,
    });

    icpwallet.getBunniesPropertiesData().then((detailsArray) => {

      this.setState({
        detailsArray: detailsArray,
      });

    });
  }

  async getAllData() {
    this.setState({
      loading: true,
    });

    const imageData = await icpwallet.getBunniesImageData();
    this.setState({
      detailsArray: imageData,
    });

    this.setState({
      loading: false,
    });

    icpwallet.getHeadersData().then((result) => {
      this.setState({
        headersData: result,
      });
    });

    icpwallet.getBunniesPropertiesData().then((detailsArray) => {

      this.setState({
        detailsArray: detailsArray,
      });
    });

    setInterval(this.updateCallback, 1000 * 60 * 5); //5 minutes
  }

  updateCallback = async () => {
    log('updateCallback: START');

    icpwallet.getHeadersData().then((result) => {
      this.setState({
        headersData: result,
      });
    });

    log('updateCallback: END');
  };

  onWalletRadioValueChange = async (value) => {
    log('In Header Radio Clicked : ' + value);

    this.setState({
      wallet: value,
    });

    this.getDataForRadioButtonClick();
  };

  onBunnyTransferCompleted = async (value) => {
    log('In onBunnyTransferCompleted : START ' + value);

    this.setState({
      detailsArray: value,
    });

    log('In onBunnyTransferCompleted : END');
  };

  onClaimCarrortsComplete = async () => {
    log('onClaimCarrortsComplete: START');

    icpwallet.getHeadersData().then((result) => {
      this.setState({
        headersData: result,
      });
    });

    log('onClaimCarrortsComplete: END');
  };

  onTransferCarrortsComplete = async () => {
    log('onTransferCarrortsComplete: START');

    icpwallet.getHeadersData().then((result) => {
      this.setState({
        headersData: result,
      });
    });

    log('onTransferCarrortsComplete: END');
  };

  getDataForRadioButtonClick = async () => {
    // 1 Initialize
    let result = 0;

    log(
      'In getDataForRadioButtonClick this.state.wallet 1 = ' + this.state.wallet
    );

    if (this.state.wallet === 'Stoic') {
      result = await icpwallet.initPlugWallet();
    } else {
      result = await icpwallet.initStoicWallet();
    }

    log('getDataForRadioButtonClick, result = ' + result);
    log(
      'In getDataForRadioButtonClick this.state.wallet 2 = ' + this.state.wallet
    );

    if (result === 0 && this.state.wallet === 'Plug') {
      this.setState({ isPlugExtensionAvailable: false });
      return;
    } else if (result === -1) {
      this.setState({ isPlugConnectionAllowed: false });
      return;
    } else {
      this.setState({ isPlugConnectionAllowed: true });

      const tempPrincipal = icpwallet.getPrincipal();
      log(tempPrincipal);
      this.setState({ principalID: tempPrincipal });

      await this.getAllData();
    }
  };

  render() {
    const { close } = this.state;

    return (
      <div>
        <Router>
          <div className="main_wrapper d-flex align-items-center">
            <div className="container">
              <header id="masthead" className="row site-header">
                <div className="col-md-2 site-branding">
                  <div className="logo">
                    <a
                      href="#top"
                      className="custom-logo-link"
                      rel="home"
                      aria-current="page"
                    >
                      <img
                        width="156"
                        height=""
                        src="/images/logo.png"
                        alt=""
                      />
                      <img
                        src="/images/carrot.png"
                        alt=""
                        style={{ display: 'none' }}
                      />
                    </a>
                  </div>
                </div>

                <div
                  className={
                    close
                      ? 'col-md-10 menu_wrpr d-flex align-items-center justify-content-end'
                      : 'col-md-10 menu_wrpr d-flex align-items-center justify-content-end active'
                  }
                >
                  <button
                    className={
                      close ? 'navbar-toggler' : 'navbar-toggler active'
                    }
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={this.handleClick}
                  >
                    <span className="navbar-toggler-icon">
                      <div className="bar1"></div>
                      <div className="bar2"></div>
                      <div className="bar3"></div>
                    </span>
                  </button>

                  <nav
                    className={
                      close
                        ? 'navbar navbar-expand-lg'
                        : 'navbar navbar-expand-lg active'
                    }
                  >
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link
                            to="/"
                            className="nav-link active"
                            aria-current="page"
                          >
                            Home
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link to="/breeding" className="nav-link">
                            Breeding
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a href="https://fw25x-naaaa-aaaal-adbpq-cai.icp0.io/" target='_blank' className="nav-link" rel="noreferrer">
                            DAO
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </header>
            </div>
          </div>

          <Switch>
            <Route path="/breeding">
              <Breeding
                isPlugExtensionAvailable={this.state.isPlugExtensionAvailable}
                isPlugConnectionAllowed={this.state.isPlugConnectionAllowed}
                wallet={this.state.wallet}
                headersData={this.state.headersData}
                detailsArray={this.state.detailsArray}
                loading={this.state.loading}
                principalID={this.state.principalID}
                onWalletRadioValueChange={this.onWalletRadioValueChange}
              />
            </Route>

            <Route path="/">
              <Home
                isPlugExtensionAvailable={this.state.isPlugExtensionAvailable}
                isPlugConnectionAllowed={this.state.isPlugConnectionAllowed}
                wallet={this.state.wallet}
                headersData={this.state.headersData}
                detailsArray={this.state.detailsArray}
                loading={this.state.loading}
                principalID={this.state.principalID}
                onWalletRadioValueChange={this.onWalletRadioValueChange}
                onClaimCarrortsComplete={this.onClaimCarrortsComplete}
                onTransferCarrortsComplete={this.onTransferCarrortsComplete}
                onBunnyTransferCompleted={this.onBunnyTransferCompleted}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Header;
