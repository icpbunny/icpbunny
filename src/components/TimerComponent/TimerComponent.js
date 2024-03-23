import React from 'react';
import './styles.css';
import incubatorImage from '../../images/Incubator.png';
// import { log } from '../../common/utils';

class TimerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining_time: null,
    };
  }

  componentDidMount() {
    setInterval(this.updateCallback, 1000);
  }

  formatRemainingTime = (timeleft) => {
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    var result;

    if (days === 0) {
      result =
        ('00' + hours).slice(-2) +
        ':' +
        ('00' + minutes).slice(-2) +
        ':' +
        ('00' + seconds).slice(-2);
    } else if (days === 1) {
      result =
        // days +
        // ' Day ' +
        ('00' + days).slice(-2) +
        ': ' +
        ('00' + hours).slice(-2) +
        ':' +
        ('00' + minutes).slice(-2) +
        ':' +
        ('00' + seconds).slice(-2);
    } else {
      result =
        // days +
        // ' Days ' +
        ('00' + days).slice(-2) +
        ': ' +
        ('00' + hours).slice(-2) +
        ':' +
        ('00' + minutes).slice(-2) +
        ':' +
        ('00' + seconds).slice(-2);
    }

    // log('result = ' + result);

    return result;
  };

  updateCallback = async () => {
    // log('updateCallback: START');

    const currentTime = new Date().getTime();

    const timeleft =
      this.props.data.properties.incubation_end_time_ms - currentTime;

    if (timeleft < 0) {
      this.setState((prevState) => ({
        remaining_time: 0,
      }));
    } else {
      const formatted_remaining_time = this.formatRemainingTime(timeleft);

      this.setState((prevState) => ({
        remaining_time: formatted_remaining_time,
      }));
    }
    // log('updateCallback: END');
  };

  render() {
    return (
      <div>
        <div className="image_box">
          <img
            className="img"
            src={incubatorImage}
            //   onClick={this.props.handleOnClickContainerEvent}
            id={this.props.data.id}
            alt=""
          />
          {/* <p>#{this.props.data.tokenId}</p>  */}

          {/* {this.state.remaining_time === 0 && <div>{'CLAIM YOUR BABY'}</div>} */}
          {this.state.remaining_time === 0 && <div>{'BABY CLAIMED'}</div>}

          {this.state.remaining_time !== 0 && (
            <div className="remaining_time">{this.state.remaining_time}</div>
          )}
        </div>
      </div>
    );
  }
}

export default TimerComponent;
