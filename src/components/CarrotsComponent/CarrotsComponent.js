import { Component } from 'react';
import './styles.css';
import { log } from '../../common/utils';

class CarrotsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nOfCarrotsToTransfer: '',
      toPrincipalId: '',
      // toPrincipalId: "ahj7j-wnohj-qzlij-y43k2-f4lxi-bbtlw-yma5s-q3wme-cmecc-wnziv-xqe",
    };
  }

  handleNumOfCarrotsTextChange = (data) => {
    this.setState((prevState) => ({
      nOfCarrotsToTransfer: data.target.value,
    }));
  };

  handlePrincipleTextChange = (data) => {
    this.setState((prevState) => ({
      toPrincipalId: data.target.value,
    }));
  };

  handleCarrotTransferClick = async () => {
    log(
      'this.props.maxnCarrotsToTransfer = ' + this.props.maxnCarrotsToTransfer
    );

    if (
      this.props.maxnCarrotsToTransfer === null ||
      this.props.maxnCarrotsToTransfer === undefined ||
      this.props.maxnCarrotsToTransfer === 0
    ) {
      alert('Insufficient balance to transfer.');
      return;
    }

    const max = parseFloat(this.props.maxnCarrotsToTransfer);
    log('max = ' + max);

    if (Number.isNaN(max)) {
      alert('Insufficient balance to transfer.');
      return;
    }

    log('this.state.nOfCarrotsToTransfer = ' + this.state.nOfCarrotsToTransfer);

    if (
      this.state.nOfCarrotsToTransfer === null ||
      this.state.nOfCarrotsToTransfer === undefined ||
      this.state.nOfCarrotsToTransfer === 0 ||
      this.state.nOfCarrotsToTransfer === ''
    ) {
      alert('Please enter the numnber of Carrots to transfer.');
      return;
    }

    const current = parseFloat(this.state.nOfCarrotsToTransfer);
    log('current = ' + current);

    if (Number.isNaN(current)) {
      alert('Please enter the numnber of Carrots to transfer.');
      return;
    }

    if (current > max) {
      alert('You have ' + max + ', please enter a value less than that.');
      return;
    }

    if (
      this.state.toPrincipalId === null ||
      this.state.toPrincipalId === undefined ||
      this.state.toPrincipalId === 0 ||
      this.state.toPrincipalId === ''
    ) {
      alert(
        'Please enter the destination Principal Id to transfer Carrots to.'
      );
      return;
    }

    log('Validaiton Success');

    alert('Your tranfer is in progress...');

    const sendButtonId = document.getElementById('sendButtonId');

    sendButtonId.innerHTML = 'TRANSFER IN PROGRESS...';
    sendButtonId.disabled = true;

    await this.props.handleCarrotTransferClick(
      this.state.toPrincipalId,
      this.state.nOfCarrotsToTransfer
    );

    sendButtonId.innerHTML = 'TRANSFER';
    sendButtonId.disabled = false;
  };

  render() {
    return (
      <div className="carrot_box">
        <div className="row mb-2">
          <div className="col-md-2 col-lg-2">
            <img width="50px" height="50px" src="/images/carrot1.png" alt="" />
          </div>

          <div className="col-md-10 col-lg-10">
            <input
              type="text"
              placeholder="No of Carrots"
              value={this.state.nOfCarrotsToTransfer}
              onChange={this.handleNumOfCarrotsTextChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <textarea
              rows="3"
              type="text"
              placeholder="Enter Principal"
              value={this.state.toPrincipalId}
              onChange={this.handlePrincipleTextChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              id="sendButtonId"
              className="inputButton"
              onClick={this.handleCarrotTransferClick}
            >
              TRANSFER
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CarrotsComponent;
