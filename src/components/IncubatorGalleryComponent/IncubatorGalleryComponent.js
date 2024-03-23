import React from 'react';
import './styles.css';

import TimerComponent from '../TimerComponent/TimerComponent';

import incubatorImage from '../../images/Incubator.png';

class IncubatorGalleryComponent extends React.Component {
  handleOnClickGalleryEvent = (clickedElement) => {
    this.props.handleOnClickHomeEvent(clickedElement);
  };

  render() {
    if (!this.props.detailsArray) {
      return (
        <h3 style={{ color: '#ff0000' }}>
          Loading your Incubators from DFinity Lands...
        </h3>
      );
    }

    if (this.props.detailsArray.length === 0) {
      return (
        <div>
          <p>
            No Incubators found, please click on the Breeding Menu to start Breeding.
          </p>
        </div>
      );
    }

    return (
      <div>
        <Container
          data={this.props.detailsArray}
          calledFrom={this.props.calledFrom}
          handleOnClickGalleryEvent={this.handleOnClickGalleryEvent}
        />
      </div>
    );
  }
}

class Container extends React.Component {
  handleOnClickContainerEvent = (event) => {
    this.props.handleOnClickGalleryEvent(this.props.data[event.target.id]);
  };

  renderTile(data, calledFrom) {
    return (
      <Tile
        data={data}
        key={data.tokenId}
        calledFrom={calledFrom}
        handleOnClickContainerEvent={this.handleOnClickContainerEvent}
      />
    );
  }

  render() {
    return (
      <div className="tiles">
        {this.props.data.map((data) => {
          return this.renderTile(data, this.props.calledFrom);
        })}
      </div>
    );
  }
}

class Tile extends React.Component {
  render() {
    return (
      <div>

          {this.props.data.properties.babyBunnyId !== null && (
            <div className="image_box">
              <img
                className="img"
                src={incubatorImage}
                onClick={this.props.handleOnClickContainerEvent}
                id={this.props.data.id}
                alt=""
              />
              <p>#{this.props.data.tokenId}</p>

              {'Baby Bunny'} #{this.props.data.properties.babyBunnyId}
            </div>
          )}

          {this.props.data.properties.babyBunnyId === null &&
            this.props.data.properties.incubation_end_time_ms === null && (
              <div className="image_box">
                <img
                  className="img"
                  src={incubatorImage}
                  onClick={this.props.handleOnClickContainerEvent}
                  id={this.props.data.id}
                  alt=""
                />
                {/* <p>#{this.props.data.tokenId}</p> */}

                {/* <div>#{'CLAIM YOUR BABY'}</div> */}
                <div>{'BABY CLAIMED'}</div>
                {/* <button
                  id="claimBabyButton"
                  className="remaining_time"
                  // onClick={this.handleCarrotTransferClick}
                >
                  CLAIM YOUR BABY
                </button> */}
              </div>
            )}

          {this.props.data.properties.babyBunnyId === null &&
            this.props.data.properties.incubation_end_time_ms !== null && 
            (
              <TimerComponent
                data={this.props.data}
              /> 
            )
            }
      </div>
    );
  }
}

export default IncubatorGalleryComponent;
