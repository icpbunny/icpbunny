import React from 'react';
import ImageGalleryComponent from '../components/ImageGalleryComponent/ImageGalleryComponent';
import IncubatorGalleryComponent from '../components/IncubatorGalleryComponent/IncubatorGalleryComponent';
import BunnyDetailsComponent from '../components/BunnyDetailsComponent/BunnyDetailsComponent';
import CarrotsComponent from '../components/CarrotsComponent/CarrotsComponent';
import { nFormatter, log } from '../common/utils';
import LoadingMask from 'react-loadingmask';
import 'react-loadingmask/dist/react-loadingmask.css';
import { LinearProgress } from '@mui/material';

import AlertDialog from '../components/Controls/Dialog';

const icpwallet = require('../common/ICPPlugWallet');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nHolders: 0,
      detailsArray: null,
      clickedElement: null,
      searchText: '',
      nCarrots: 0,
      nCarrotsDisplay: 0,
//
      bIsBunnyTab: true,
      bIsCarrotsTab: false,
      bIsIncubatorsTab: false,
//
      bIsClaimStarted: false,
      bIsClaimCompleted: false,
      bIsClaimInProgress: false,
      claimMessage: '',
      incubationsData:null
    };

    this.onWalletRadioValueChange = this.onWalletRadioValueChange.bind(this);
  }

  onWalletRadioValueChange(event) {
    this.props.onWalletRadioValueChange(event.target.value);

    this.setState({
      clickedElement: null,
    });
  }

  handleCarrotTransferClick = async (destination_principal_ID, nCarrots) => {
    // log("In handleCarrotTransferClick " + destination_principal_ID + ", " + nCarrots);

    const result = await icpwallet.transferCarrot(
      destination_principal_ID,
      nCarrots
    );

    log('result = ' + result);

    alert(nCarrots + ' Carrots transferred Successfully.');

    this.props.onTransferCarrortsComplete();
  };

  handleBunnyTransferClick = async (principle, tokenId, index) => {
    log(
      'In handleBunnyTransferClick ' + principle + ', ' + tokenId + ', ' + index
    );

    //Check if the Token Id Exists in our Account
    const isFound = this.props.detailsArray.some((element) => {
      if (parseInt(element.tokenId) === parseInt(tokenId)) {
        return true;
      }
      return false;
    });

    log('Is Token found in our Account = ' + isFound);

    if (!isFound) {
      alert('This bunny is not in your account.');
      return;
    }

    const result = await icpwallet.transferBunny(principle, parseInt(tokenId));

    if (result) {
      //Create a clone
      let newArray = [...this.props.detailsArray];

      //Remove the Transferred item
      let array = newArray.filter((value) => value.tokenId !== tokenId);

      //reset the id to start from 0 again
      for (let i = 0; i < array.length; i++) {
        array[i].id = i;
      }

      this.setState({
        clickedElement: null,
        // detailsArray: array,
      });

      this.props.onBunnyTransferCompleted(array);
    }
  };

  handleSearchClick = async () => {
    const icpNumber = parseInt(this.state.searchText, 10);

    if (this.state.searchText === '' || icpNumber < 0 || icpNumber > 8370) {
      alert('Pleae enter ICP number from 0 to 8370');
      return;
    }

    const search = document.getElementById('searchButtonId');
    search.innerHTML = 'LOADING';
    search.disabled = true;

    const bunniesPropertiesData = await icpwallet.getBunnyData(icpNumber);

    search.innerHTML = 'SEARCH';
    search.disabled = false;

    this.setState((prevState) => ({
      clickedElement: bunniesPropertiesData,
    }));
  };

  handleClaimCarrots = async () => {
    this.setState({
      bIsClaimStarted: true,
      claimMessage: 'Your claim process is in progress...',
    });
  };

  handleClaimStartedCallback = async () => {
    this.setState({ bIsClaimStarted: false });
    this.setState({ bIsClaimInProgress: true });

    const search = document.getElementById('claimButton');

    search.innerHTML = 'CLAIM IN PROGRESS...';
    search.disabled = true;

    const result = await icpwallet.claimCarrots();

    search.innerHTML = 'CLAIM CARROTS';
    search.disabled = false;

    this.setState({
      bIsClaimCompleted: true,
      claimMessage: 'Total ICPCarrots claimed ' + nFormatter(result, 2),
    });

    this.setState({ bIsClaimInProgress: false });
    this.props.onClaimCarrortsComplete();
  };

  handleClaimCompletedCallback = async () => {
    this.setState({ bIsClaimCompleted: false });
  };

  handleMyICPBunnyClick = async () => {
    log('handleMyICPBunnyClick clicked');

    this.setState({ bIsBunnyTab: true });
    this.setState({ bIsCarrotsTab: false });
    this.setState({ bIsIncubatorsTab: false });
  };

  handleMyICPCarrotsClick = async () => {
    log('handleMyICPCarrotsClick clicked');

    this.setState({ bIsBunnyTab: false });
    this.setState({ bIsCarrotsTab: true });
    this.setState({ bIsIncubatorsTab: false });
    
  };

  handleMyIncubatorsClick = async () => {
    // log('handleMyIncubatorsClick clicked');

    this.setState({ bIsBunnyTab: false });
    this.setState({ bIsCarrotsTab: false });
    this.setState({ bIsIncubatorsTab: true });

    this.getIncubationsData();
  };

  getIncubationsData = async () => {

    const incubationsData = await icpwallet.getIncubationsData();

    this.setState((prevState) => ({
      incubationsData: incubationsData,
    }));

  };

  handleSearchTextChange = (data) => {
    this.setState((prevState) => ({
      searchText: data.target.value,
    }));
  };

  handleOnClickHomeEvent = (clickedElement) => {
    this.setState((prevState) => ({
      clickedElement: clickedElement,
    }));
  };

  handleOnClickIncubatorEvent = async () => {
    // log('In handleOnClickIncubatorEvent clicked');
  };

  render() {
    return (
      <div className="container-fluid p-0">
        {/* Top Image */}
        <div
          className="home_sliders"
          id=""
          style={{
            background: 'url(/images/bnr.jpg)',
            width: '100%',
            display: 'inline-block',
            height: '80vh',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="container-fluid p-0 h-100">
            <div className="row align-items-center h-100"></div>
          </div>
        </div>

        {/* Gang */}
        <div className="row">
          <div className="col">
            <div className="text-center mb-2 mt-2">
              <h1 className="main-heading">
                <span>ICPBunny</span> Gang
              </h1>
            </div>
          </div>
        </div>

        {/* Bunny Dashboard */}
        <div className="row mt-4 justify-content-center text-center">
          {/* Total Bunnies */}
          <div className="col-md-auto pe-2 ps-2">
            <div className="number_dtl">
              <span className="">8.37K</span>
              <p>Bunnies</p>
            </div>
          </div>

          {/* Number of Holders */}
          <div className="col-md-auto pe-2 ps-2">
            <div className="number_dtl">
              <span className="">{this.props.headersData.nHolders}</span>
              <p>Wallets</p>
            </div>
          </div>

          {/* Number of Transfers */}
          <div className="col-md-auto pe-2 ps-2">
            <div className="number_dtl">
              <span className="">{this.props.headersData.nTransfers}</span>
              <p>Transfers</p>
            </div>
          </div>
        </div>

        {/* Carrot Dashboard */}
        <div className="row mt-4 justify-content-center text-center">
          {/* Number of Carrots */}
          <div className="col-md-auto pe-2 ps-2">
            <div className="number_dtl">
              <span className="">{this.props.headersData.nCarrotsDisplay}</span>
              <p>
                <img src="/images/carrot1.png" alt="" width="30px"></img>
              </p>
            </div>
          </div>

          {/* Total Carrots Supply */}
          <div className="col-md-auto pe-2 ps-2">
            <div className="number_dtl">
              <span className="">
                {this.props.headersData.nTotalCarrotsSupply}
              </span>
              <p>
                <img src="/images/carrot1.png" alt="" width="30px"></img>Supply
              </p>
            </div>
          </div>

          {/* Total Carrot Holders */}
          <div className="col-md-auto pe-2 ps-2">
            <div className="number_dtl">
              <span className="">
                {this.props.headersData.nTotalCarrotHolders}
              </span>
              <p>
                <img src="/images/carrot1.png" alt="" width="30px"></img>Holders
              </p>
            </div>
          </div>
        </div>

        {/* Description Dashboard 1*/}
        <div className="row justify-content-center text-center">
          <div className="col">
            <div className="details_box mt-3">
              <p className="text-center mb-1">
                10,000 ICPBunnies living on the DFinity Lands, each of them
                earns ICPCarrots,
              </p>
            </div>
          </div>
        </div>

        {/* Description Dashboard 2*/}
        <div className="row justify-content-center text-center">
          <div className="col">
            <div className="details_box mt-3">
              <p className="text-center mb-1">
                breeds BabyBunnies, algorithmically generated and minted
                on-chain
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Selection */}
        <div className="row mt-4 p-5 align-items-center justify-content-center">
          <div className="col-3 text-center">
            <div className="walet">
              <h5>CONNECT USING</h5>
            </div>
          </div>

          <div className="col-2">
            <label>
              <input
                className="radioWallet"
                type="radio"
                value="Plug"
                checked={this.props.wallet === 'Plug'}
                onChange={this.onWalletRadioValueChange}
              ></input>
              <img
                src="/images/PlugWallet.jpg"
                alt=""
                height="45px"
                width="45px"
              ></img>
            </label>
          </div>

          <div className="col-2">
            <label>
              <input
                className="radioWallet"
                type="radio"
                value="Stoic"
                checked={this.props.wallet === 'Stoic'}
                onChange={this.onWalletRadioValueChange}
              ></input>
              <img src="/images/stoicwallet_logo.png" alt="" width="55px"></img>
            </label>
          </div>
        </div>

        {/* Principal */}
        <div className="row mt-1 ml-5 justify-content-start">
          {this.props.principalID && (
            <h6>Principal: {this.props.principalID}</h6>
          )}
          {!this.props.principalID && (
            <h6>Principal: {''}</h6>
          )}
        </div>

        {/* No of ICPBunny */}
        <div className="row mt-1 ml-5 justify-content-start">
          {this.props.detailsArray && (
            <h6>No of ICPBunny NFTs : {this.props.detailsArray.length}</h6>
          )}
          {!this.props.detailsArray && (
            <h6>No of ICPBunny NFTs : {''}</h6>
          )}
        </div>

        {/* Claim Box */}
        <div className="row mt-3 align-content-center justify-content-start">
          <div className="col-md-auto pe-3 mt-2">
            <button
              width="100%"
              id="myICPBunnyId"
              className="custom-btn"
              onClick={this.handleMyICPBunnyClick}
            >
              <span>MY ICPBUNNY</span>
            </button>
          </div>

          <div className="col-md-auto pe-3 mt-2">
            <button
              width="100%"
              id="myICPCarrotId"
              className="custom-btn"
              onClick={this.handleMyICPCarrotsClick}
            >
              <span>MY ICPCARROTS</span>
            </button>
          </div>

          <div className="col-md-auto pe-3 mt-2">
            <button
              width="100%"
              id="myIncubatorsId"
              className="custom-btn"
              onClick={this.handleMyIncubatorsClick}
            >
              <span>MY INCUBATORS</span>
            </button>
          </div>

          <div className="col-md-auto pe-3 mt-2">
            <button
              width="100%"
              id="claimButton"
              className="custom-btn"
              onClick={this.handleClaimCarrots}
            >
              <span>CLAIM ICP CARROTS</span>
            </button>
          </div>
        </div>

        <div className="row mt-3 align-content-center justify-content-center">
          <div className="col-11">
            {this.state.bIsClaimInProgress && <LinearProgress />}
          </div>
        </div>

        {/* Search Box */}
        <div className="row mt-3 align-content-center justify-content-start">
          <AlertDialog
            open={this.state.bIsClaimStarted}
            handleClose={this.handleClaimStartedCallback}
            title="CLAIM STATUS"
            message={this.state.claimMessage}
          />

          <AlertDialog
            open={this.state.bIsClaimCompleted}
            handleClose={this.handleClaimCompletedCallback}
            title="CLAIM STATUS"
            message={this.state.claimMessage}
          />

          {this.state.bIsBunnyTab && (
            <div className="col-md-auto pe-3 mt-2">
              <input
                type="text"
                className="inputTextBox"
                placeholder="Enter ICP #"
                value={this.state.searchText}
                onChange={this.handleSearchTextChange}
              />
            </div>
          )}

          {this.state.bIsBunnyTab && (
            <div className="col-md-auto mt-2">
              <button
                id="searchButtonId"
                className="custom-btn"
                onClick={this.handleSearchClick}
              >
                <span>SEARCH</span>
              </button>
            </div>
          )}
        </div>

        {/* MY ICP Bunny Box*/}
        {this.state.bIsBunnyTab && (
          <div style={{ minHeight: '600px' }}>
            {/* MY ICP Bunny Heading*/}
            <div className="row mt-5 ml-5 justify-content-start">
              <div className="col walet">
                <h4>My ICPBunny</h4>
              </div>
            </div>

            <LoadingMask
              loading={this.props.loading}
              loadingText={'Loading...'}
            >
              {/* Images */}
              <div className="row mt-3 ml-5 justify-content-start">
                {/* Image Gallery*/}
                <div className="col-md-8 col-lg-8 col-sm-12">
                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade active show"
                      id="ex1-pills-3"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-3"
                    >
                      <div className="col-md-12">
                        <div className="row">
                          {this.props.wallet === 'Plug' &&
                            !this.props.isPlugExtensionAvailable && (
                              <div>
                                Please install the Plug Extension to continue.
                              </div>
                            )}

                          {!this.props.isPlugConnectionAllowed && (
                            <div>Please allow Plug Connection to continue.</div>
                          )}

                          {((this.props.wallet === 'Plug' &&
                            this.props.isPlugExtensionAvailable &&
                            this.props.isPlugConnectionAllowed) ||
                            (this.props.wallet === 'Stoic' &&
                              this.props.isPlugConnectionAllowed)) && (
                            <ImageGalleryComponent
                              detailsArray={this.props.detailsArray}
                              handleOnClickHomeEvent={
                                this.handleOnClickHomeEvent
                              }
                              calledFrom="Home"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bunny Component */}
                <div className="col-md-4 col-lg-4 col-sm-12">
                  <BunnyDetailsComponent
                    handleBunnyTransferClick={this.handleBunnyTransferClick}
                    clickedElement={this.state.clickedElement}
                  />
                </div>
              </div>
            </LoadingMask>
          </div>
        )}

        {/* MY ICP Carrots Box*/}
        {this.state.bIsCarrotsTab && (
          <div style={{ minHeight: '600px' }}>
            {/* MY ICP Carrots Heading*/}
            <div className="row mt-5 ml-5 justify-content-start">
              <div className="col walet">
                <h4>My ICPCARROTS</h4>
              </div>
            </div>

            {/* Carrots Component */}
            <div className="row mt-3 mb-5 justify-content-start w-75">
              <div className="col-md-1 col-lg-1 col-sm-1"></div>

              <div className="col-md-6 col-lg-6 col-sm-12">
                <CarrotsComponent
                  maxnCarrotsToTransfer={this.props.headersData.nCarrots}
                  handleCarrotTransferClick={this.handleCarrotTransferClick}
                />
              </div>
            </div>
          </div>
        )}


        {/* MY Incubators Box*/}
        {this.state.bIsIncubatorsTab && (
          <div style={{ minHeight: '600px' }}>
            {/* MY ICP Bunny Heading*/}
            <div className="row mt-5 ml-5 justify-content-start">
              <div className="col walet">
                <h4>My Incubators</h4>
              </div>
            </div>

            <LoadingMask
              loading={this.props.loading}
              loadingText={'Loading...'}
            >
              {/* Images */}
              <div className="row mt-3 ml-5 justify-content-start">
                {/* Image Gallery*/}
                <div className="col-md-8 col-lg-8 col-sm-12">
                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade active show"
                      id="ex1-pills-3"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-3"
                    >
                      <div className="col-md-12">
                        <div className="row">                         
                          {
                            <IncubatorGalleryComponent
                              detailsArray={this.state.incubationsData}
                              handleOnClickHomeEvent={this.handleOnClickIncubatorEvent
                              }
                              calledFrom="Home"
                            />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </LoadingMask>
          </div>
        )}

      </div>
    );
  }
}

export default Home;
