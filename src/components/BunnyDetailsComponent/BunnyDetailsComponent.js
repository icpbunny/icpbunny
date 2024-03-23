import { Component } from 'react';
import './styles.css';
import {
  isVowel,
  log,
  formatDate,
  formatPropertiesLabel,
} from '../../common/utils';

import male from '../../images/male.png';
import female from '../../images/female.png';

class BunnyDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPrinciepleTextBoxVisible: false,
      // principleId: "",
      principleId: '', //  account 1 My original
    };
  }

  handlePrincipleTextChange = (data) => {
    this.setState((prevState) => ({
      principleId: data.target.value,
    }));
  };

  handleBunnyTransferClick = async () => {
    if (!this.state.isPrinciepleTextBoxVisible) {
      this.setState({ isPrinciepleTextBoxVisible: true });
      log('Making Principle visible and returning');
      return;
    }

    if (
      this.state.principleId === null ||
      this.state.principleId === undefined ||
      this.state.principleId === 0 ||
      this.state.principleId === ''
    ) {
      alert('Please enter the destination Principal Id to transfer Bunny to.');
      return;
    }

    const sendButton = document.getElementById('sendButtonId');
    sendButton.innerHTML = 'SENDING ...';
    sendButton.disabled = true;

    await this.props.handleBunnyTransferClick(
      this.state.principleId,
      this.props.clickedElement.tokenId,
      this.props.clickedElement.id
    );

    sendButton.innerHTML = 'TRANSFER';
    sendButton.disabled = false;
  };

  handleLandTransferClick = async () => {
    const sendButton = document.getElementById('sendButtonId');
    sendButton.innerHTML = 'SENDING ...';
    sendButton.disabled = true;

    await this.props.handleBunnyTransferClick(
      this.state.principleId,
      this.props.clickedElement.tokenId,
      this.props.clickedElement.id
    );

    sendButton.innerHTML = 'TRANSFER';
    sendButton.disabled = false;
  };

  render() {
    if (this.props.clickedElement == null) {
      return <div></div>;
    }

    if (this.props.clickedElement.isMap) {
      return (
        <div className="row bunnyDetails align-items-center justify-content-center">
          {/* Image */}
          <div className="col-5 bunnyDetailsImageBox">
            <a
              href="https://bit.ly/TheBunnyIsland"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="image"
                src={this.props.clickedElement.image}
                alt=""
              />
              <p className="para">#{this.props.clickedElement.tokenId}</p>
            </a>
          </div>

          <div className="col-12 pt-2">
            <p>
              You can visit
              <a
                href="https://bit.ly/TheBunnyIsland"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                map{' '}
              </a>
              and enter the co-ordinates to view your LAND
            </p>
          </div>

          {/* Transfer Edit Box */}
          <div className="col-12 pt-2">
            <textarea
              rows="4"
              type="text"
              placeholder="Enter Principal"
              value={this.state.principleId}
              onChange={this.handlePrincipleTextChange}
            />
          </div>

          {/* Transfer Button */}
          <div className="col-12 pt-2 pb-2">
            <button
              id="sendButtonId"
              className="inputButton"
              onClick={this.handleLandTransferClick}
            >
              TRANSFER
            </button>
          </div>
        </div>
      );
    }

    if (
      this.props.clickedElement.properties === undefined ||
      this.props.clickedElement.properties.length === 0
    ) {
      return (
        <div>Loading data for #{this.props.clickedElement.tokenId} ... </div>
      );
    }

    const genderText =
      this.props.clickedElement.properties[4].value === 'M' ? 'He' : 'She';
    const isBreednameVowel = isVowel(
      this.props.clickedElement.properties[0].value.charAt(0)
    );
    const breedName = isBreednameVowel ? ' is an ' : ' is a ';

    const breedingTimesText =
      this.props.clickedElement.properties[3].value === '1'
        ? this.props.clickedElement.properties[3].value + ' time'
        : this.props.clickedElement.properties[3].value + ' times';

    let birthDate;
    log('date_of_birth = ' + this.props.clickedElement.date_of_birth);
    const myNumber = Number(this.props.clickedElement.date_of_birth);
    log('myNumber = ' + myNumber);

    if (myNumber !== undefined) {
      birthDate = formatDate(myNumber);
    }

    let deathDate;
    log('properties[7] = ' + this.props.clickedElement.properties[7]);
    if (this.props.clickedElement.properties[7] !== undefined) {
      log(this.props.clickedElement.properties[7].value);
      deathDate = formatDate(this.props.clickedElement.properties[7].value);
    }

    log('properties[8] = ' + this.props.clickedElement.properties[8]);
    if (this.props.clickedElement.properties[8] !== undefined) {
      log(
        'properties[8] value = ' + this.props.clickedElement.properties[8].value
      );
    }
    /*
    let expiryDate;
    // log("properties[3] = " + this.props.clickedElement.properties[3]);
    if(this.props.clickedElement.properties[3] !== undefined) {
      log("this.props.clickedElement.properties[3].value = " + this.props.clickedElement.properties[3].value);

      let expiry_interval_in_months = (this.props.clickedElement.properties[3].value * 1);
      let expiry_interval_in_milliseconds = expiry_interval_in_months *  8.64e+13 * 30;

      log("expiry_interval_in_milliseconds = " + expiry_interval_in_milliseconds);

      let production_in_milliseconds = (this.props.clickedElement.date_of_birth * 1);
      log("birth_date = " + this.props.clickedElement.date_of_birth);

      let expiry_date_in_milliseconds = production_in_milliseconds * 1 + expiry_interval_in_milliseconds * 1;
      log("expiry_date_in_milliseconds = " + expiry_date_in_milliseconds);

      let expiryDate = formatDate(expiry_date_in_milliseconds);

      log("expiryDate = " + expiryDate);
    }
*/

    return (
      <div className="row bunnyDetails align-items-center justify-content-center">
        {/* Image */}
        <div className="col-5 bunnyDetailsImageBox">
          <img className="image" src={this.props.clickedElement.image} alt="" />

          {this.props.clickedElement.properties &&
            this.props.clickedElement.properties[4] &&
            this.props.clickedElement.properties[4].name &&
            this.props.clickedElement.properties[4].name === 'Gender' &&
            this.props.clickedElement.properties[4].value &&
            (this.props.clickedElement.properties[4].value === 'M' ? (
              <img className="gender" src={male} alt="" />
            ) : (
              <img className="gender" src={female} alt="" />
            ))}

          {/* <p className="para">#{this.props.clickedElement.tokenId}</p> */}
          <p>#{this.props.clickedElement.tokenId}</p>
        </div>

        {/* Description */}

        {!this.props.clickedElement.isSerumType && (
          <div className="col-12">
            <p>
              {'#' +
                this.props.clickedElement.tokenId +
                ', ' +
                genderText +
                breedName +
                this.props.clickedElement.properties[0].value +
                ' with a lifespan of ' +
                this.props.clickedElement.properties[2].value +
                ' months, can breed ' +
                breedingTimesText +
                ' and earns ' +
                this.props.clickedElement.properties[1].value +
                ' carrots a day.'}
            </p>
          </div>
        )}

        {this.props.clickedElement.isSerumType && (
          <div className="col-12">
            <p>
              {'#' +
                this.props.clickedElement.tokenId +
                ', ' +
                this.props.clickedElement.properties[4].value}
            </p>
          </div>
        )}

        {/* Transfer Edit Box */}
        {this.state.isPrinciepleTextBoxVisible && (
          <div className="col-12">
            <textarea
              rows="4"
              type="text"
              placeholder="Enter Principal"
              value={this.state.principleId}
              onChange={this.handlePrincipleTextChange}
            />
          </div>
        )}

        {/* Transfer Button */}
        <div className="col-12">
          <button
            id="sendButtonId"
            className="inputButton"
            onClick={this.handleBunnyTransferClick}
          >
            TRANSFER
          </button>
        </div>

        {/* Table */}
        {!this.props.clickedElement.isSerumType && (
          <div className="col-12">
            <table className="table">
              <tbody>
                <tr>
                  <td>Birth Date</td>
                  <td>{birthDate}</td>
                </tr>

                {this.props.clickedElement.properties[7] && (
                  <tr>
                    <td>{this.props.clickedElement.properties[7].name}</td>
                    <td>{deathDate}</td>
                  </tr>
                )}

                {this.props.clickedElement.properties[8] && (
                  <tr>
                    <td>{this.props.clickedElement.properties[8].name}</td>
                    <td>{this.props.clickedElement.properties[8].value}</td>
                  </tr>
                )}

                <tr>
                  <td>{this.props.clickedElement.properties[0].name}</td>
                  <td>{this.props.clickedElement.properties[0].value}</td>
                </tr>
                <tr>
                  <td>{this.props.clickedElement.properties[4].name}</td>
                  <td>{this.props.clickedElement.properties[4].value}</td>
                </tr>
                <tr>
                  <td>
                    {formatPropertiesLabel(
                      this.props.clickedElement.properties[2].name
                    )}
                  </td>
                  <td>
                    {this.props.clickedElement.properties[2].value} months
                  </td>
                </tr>
                <tr>
                  <td>
                    {formatPropertiesLabel(
                      this.props.clickedElement.properties[3].name
                    )}
                  </td>
                  <td>{breedingTimesText}</td>
                </tr>
                <tr>
                  <td>
                    {formatPropertiesLabel(
                      this.props.clickedElement.properties[1].name
                    )}
                  </td>
                  <td>
                    {this.props.clickedElement.properties[1].value} carrots
                  </td>
                </tr>
                <tr>
                  <td>{this.props.clickedElement.properties[5].name}</td>
                  <td>{this.props.clickedElement.properties[5].value}</td>
                </tr>

                <tr>
                  <td>
                    {formatPropertiesLabel(
                      this.props.clickedElement.properties[6].name
                    )}
                  </td>
                  <td>{this.props.clickedElement.properties[6].value}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {this.props.clickedElement.isSerumType && (
          <div className="col-12">
            <table className="table">
              <tbody>
                <tr>
                  <td>Production Date</td>
                  <td>{birthDate}</td>
                </tr>

                {this.props.clickedElement.properties[0] && (
                  <tr>
                    <td>{this.props.clickedElement.properties[0].name}</td>
                    <td>{this.props.clickedElement.properties[0].value}</td>
                  </tr>
                )}

                {this.props.clickedElement.properties[5] && (
                  <tr>
                    <td>{this.props.clickedElement.properties[5].name}</td>
                    <td>{this.props.clickedElement.properties[5].value}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default BunnyDetailsComponent;
