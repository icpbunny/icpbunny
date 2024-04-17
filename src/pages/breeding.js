import React from 'react';
import ImageGalleryComponent from '../components/ImageGalleryComponent/ImageGalleryComponent';
import BreedingComponent from '../components/BreedingComponent/BreedingComponent';
import LoadingMask from 'react-loadingmask';
import 'react-loadingmask/dist/react-loadingmask.css';

const icpwallet = require('../common/ICPPlugWallet');

class Breeding extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      clickedElement: null,
    };

    this.onWalletRadioValueChange = this.onWalletRadioValueChange.bind(this);
  }

  onWalletRadioValueChange(event) {
    this.props.onWalletRadioValueChange(event.target.value);

    //Call the Child to clear the old selected parents
    this.myRef.current.clearParents();
  }

  handleOnClickHomeEvent = (clickedElement) => {
    this.setState((prevState) => ({
      clickedElement: clickedElement,
    }));
  };

  Incubate = async (parentToken1, parentToken2) => {
    if (this.props.headersData.nCarrots < 600) {
      alert('You need a minimum of 600 carrots for Breeding !');
      return;
    }

    const result = await icpwallet.ICPIncubate(parentToken1, parentToken2);
    return result;
  };

  render() {
    return (
      <div className="container-fluid p-0">
        {/* Top Image */}
        <div
          className="home_sliders"
          id=""
          style={{
            background: 'url(images/icpbunny_breeding.png) center',
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

          <div className="col-2">
            <a href='http://localhost:3001' target='_blank' rel="noreferrer">
              <img src="/images/Bitcoin.png" alt="" width="55px"></img>
              <label className="walet" style={{ cursor: "pointer" }}>
                <h5>
                  Wallet
                </h5>
              </label>
            </a>
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

        {/* MY ICP Bunny Box*/}
        <div style={{ minHeight: '600px' }}>
          {/* MY ICP Bunny Heading*/}
          <div className="row mt-5 ml-5 justify-content-start">
            <div className="col walet">
              <h4>BREEDING</h4>
            </div>
          </div>

          <LoadingMask loading={this.props.loading} loadingText={'Loading...'}>
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
                              handleOnClickHomeEvent={this.handleOnClickHomeEvent}
                              calledFrom="Breeding"
                            />
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breeding Component */}
              <div className="col-md-4 col-lg-4 col-sm-12">
                <BreedingComponent
                  Incubate={this.Incubate}
                  clickedElement={this.state.clickedElement}
                  ref={this.myRef}
                />
              </div>
            </div>
          </LoadingMask>
        </div>
      </div>
    );
  }
}

export default Breeding;
