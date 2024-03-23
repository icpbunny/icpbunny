import React from 'react';
import './styles.css';

import male from '../../images/male.png';
import female from '../../images/female.png';

class ImageGalleryComponent extends React.Component {
  handleOnClickGalleryEvent = (clickedElement) => {
    this.props.handleOnClickHomeEvent(clickedElement);
  };

  render() {
    if (!this.props.detailsArray) {
      return (
        <h3 style={{ color: '#ff0000' }}>
          Loading your Bunnies from DFinity Lands...
        </h3>
      );
    }

    if (this.props.detailsArray.length === 0) {
      return (
        <div>
          <a
            target="_blank"
            href="https://entrepot.app/marketplace/icpbunny"
            rel="noreferrer"
          >
            No Bunnies found, please click here to purchase your first Bunny.
          </a>
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
    if (this.props.calledFrom === 'Breeding' && this.props.data.isSerumType) {
      return <div></div>;
    }

    if (this.props.calledFrom === 'Breeding' && this.props.data.isMap) {
      return <div></div>;
    }

    return (
      <div className="image_box">
        <span id="gender">
          {this.props.data.properties &&
            this.props.data.properties[4] &&
            this.props.data.properties[4].name &&
            this.props.data.properties[4].name === 'Gender' &&
            this.props.data.properties[4].value &&
            (this.props.data.properties[4].value === 'M' ? (
              <img id="genderImage" src={male} alt="" />
            ) : (
              <img id="genderImage" src={female} alt="" />
            ))}
        </span>
        <img
          className="img"
          src={this.props.data.image}
          onClick={this.props.handleOnClickContainerEvent}
          id={this.props.data.id}
          alt=""
        />
        <p>#{this.props.data.tokenId}</p>
      </div>
    );
  }
}

export default ImageGalleryComponent;
