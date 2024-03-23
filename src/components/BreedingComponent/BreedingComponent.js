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

class BreedingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPrinciepleTextBoxVisible: false,
      principleId: '', //  account 1 My original
      parent1: null,
      parent2: null,
      transferResult: false,
    };
  }

  handlePrincipleTextChange = (data) => {
    this.setState((prevState) => ({
      principleId: data.target.value,
    }));
  };

  setParent1 = async () => {
    if (this.props.clickedElement.isSerumType) {
      alert('Serum cannot breed !');
      return;
    }

    if (parseInt(this.props.clickedElement.properties[3].value) === 0) {
      alert('This parent cannot breed anymore !');
      return;
    }

    if (this.props.clickedElement.properties[7] !== undefined) {
      alert('Zombie parents cannot breed !');
      return;
    }

    this.setState({
      parent1: this.props.clickedElement,
    });

    log('Parent 1 ' + this.props.clickedElement.tokenId);
  };

  setParent2 = async () => {
    if (this.props.clickedElement.isSerumType) {
      alert('Serum cannot breed !');
      return;
    }

    if (parseInt(this.props.clickedElement.properties[3].value) === 0) {
      alert('This parent cannot breed anymore !');
      return;
    }

    if (this.props.clickedElement.properties[7] !== undefined) {
      alert('Zombie parents cannot breed !');
      return;
    }

    this.setState({
      parent2: this.props.clickedElement,
    });

    log('Parent 2 ' + this.props.clickedElement.tokenId);
  };

  handleIncubate = async () => {
    log('In handleIncubate');

    //alert("Breeding season starts soon.");

    if (this.state.parent1 === null || this.state.parent2 === null) {
      alert('Please select two parents.');
      return;
    }

    if (this.state.parent1.tokenId === this.state.parent2.tokenId) {
      alert('Please select two different parents.');
      return;
    }

    if (
      this.state.parent1.properties[4].value ===
      this.state.parent2.properties[4].value
    ) {
      alert(
        'You cannot breed BabyBunny with same gender Parents.\n Please consider selecting opposite gender Bunnies'
      );
      return;
    }

    const startIncubate = document.getElementById('startIncubate');
    startIncubate.innerHTML = 'PLEASE WAIT, INCUBATING ...';
    startIncubate.disabled = true;

    await this.props.Incubate(
      this.state.parent1.tokenId,
      this.state.parent2.tokenId
    );

    startIncubate.innerHTML = 'INCUBATE';
    startIncubate.disabled = false;
  };

  clearParents = async () => {
    log('In clearParents');

    this.setState({
      parent1: null,
      parent2: null,
    });
  };

  render() {
    if (this.props.clickedElement == null) {
      return <div></div>;
    }

    if (this.props.clickedElement.isMap) {
      return <div></div>;
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
    log(this.props.clickedElement.date_of_birth);
    const myNumber = Number(this.props.clickedElement.date_of_birth);
    log(myNumber);

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

    return (
      <div>
        <div className="row sec_detl_breeding align-items-center justify-content-center">
          <div className="walet row mt-4 justify-content-center text-center">
            <h4>PLEASE SELECT TWO PARENTS</h4>
          </div>

          <div className="row justify-content-around">
            {/* Image 1 */}
            {this.state.parent1 && (
              <div className="col-5 image_box_top">
                <p className="para">Parent 1</p>

                <img className="image" src={this.state.parent1.image} alt="" />

                {this.state.parent1.properties[4].value === 'M' ? (
                  <img className="gender" src={male} alt="" />
                ) : (
                  <img className="gender" src={female} alt="" />
                )}

                <p className="para">#{this.state.parent1.tokenId}</p>
              </div>
            )}

            {/* Image 2 */}
            {this.state.parent2 && (
              <div className="col-5 image_box_top">
                <p className="para">Parent 2</p>

                <img className="image" src={this.state.parent2.image} alt="" />

                {this.state.parent2.properties[4].value === 'M' ? (
                  <img className="gender" src={male} alt="" />
                ) : (
                  <img className="gender" src={female} alt="" />
                )}

                <p className="para">#{this.state.parent2.tokenId}</p>
              </div>
            )}
          </div>
        </div>

        <div className="row bunnyDetails align-items-center justify-content-center">
          {/* Image */}
          <div className="col-5 bunnyDetailsImageBox">
            <img
              className="image"
              src={this.props.clickedElement.image}
              alt=""
            />

            {this.props.clickedElement.properties[4].value &&
            this.props.clickedElement.properties[4].value === 'M' ? (
              <img className="gender" src={male} alt="" />
            ) : (
              <img className="gender" src={female} alt="" />
            )}

            <p className="para">#{this.props.clickedElement.tokenId}</p>
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
          {/*Set Parent 1 */}
          <div className="col-12 m-2">
            <button
              id="sendButtonId1"
              className="inputButton"
              onClick={this.setParent1}
            >
              SET AS PARENT 1
            </button>
          </div>

          {/*Set Parent 2 */}
          <div className="col-12 m-2">
            <button
              id="sendButtonId2"
              className="inputButton"
              onClick={this.setParent2}
            >
              SET AS PARENT 2
            </button>
          </div>

          {/*Start Incubate */}
          <div className="col-12 m-2">
            <button
              id="startIncubate"
              className="inputButton"
              onClick={this.handleIncubate}
            >
              INCUBATE
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
      </div>
    );
  }
}

export default BreedingComponent;
