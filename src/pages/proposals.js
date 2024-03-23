import { Principal } from '@dfinity/principal';
import React from 'react';
import LoadingMask from 'react-loadingmask';
import 'react-loadingmask/dist/react-loadingmask.css';
import { sliceAddress } from '../common/utils';
import BreedingComponent from '../components/BreedingComponent/BreedingComponent';

const icpwallet = require('../common/ICPPlugWallet');

class Proposals extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            data: {
                successRatio: "1",
            },
            clickedElement: null,
            isChecked: false,
            activeCanister: {
                id: "",
                name: ""
            },
            dynamicInputs: [Date.now(), Date.now()],
            isSubmitting: false,
        };
    }

    componentDidMount() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("start_date").setAttribute("min", today);
        document.getElementById("end_date").setAttribute("min", today);
    }

    componentDidUpdate() {
        if (this.state.data.endDate) {
            document.getElementById("start_date").setAttribute("max", this.state.data.endDate);
        }
        if (this.state.data.startDate) {
            document.getElementById("end_date").setAttribute("min", this.state.data.startDate);
        }
    }

    getMeridian(value) {
        var timeSplit = value.split(':'),
            hours,
            minutes,
            meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
                hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        return (`${hours}:${minutes} ${meridian}`)
    }

    getUnixTimeStamp(dates, time) {
        // Replace "2024-03-20T12:00:00" with your desired date/time
        const date = new Date(dates + "T" + time + ":00");
        const unixTimestampMilliseconds = date.getTime();

        return unixTimestampMilliseconds
    }

    getSuccessRatio(key) {
        switch (key) {
            case "1":
                return 20

            case "2":
                return 40

            case "3":
                return 60

            case "4":
                return 80

            case "5":
                return 100

            default:
                return 20
        }
    }

    handleAddQuestion() {
        const data = this.state.data;
        let {
            discussionLink,
            endDate,
            endTime,
            question,
            startDate,
            startTime,
            successRatio,
            title
        } = data;

        let options = [];
        Object.entries(data).forEach(data => {
            let time;
            let unixTimeStamp;

            if (data[0].includes("option")) {
                options.push(data[1]);
            }
            if (data[0].includes("startTime")) {
                time = this.getMeridian(data[1]);
                unixTimeStamp = this.getUnixTimeStamp(startDate, startTime)
                startTime = unixTimeStamp;
            }
            if (data[0].includes("endTime")) {
                time = this.getMeridian(data[1]);
                unixTimeStamp = this.getUnixTimeStamp(endDate, endTime);
                endTime = unixTimeStamp;
            }
        });

        successRatio = this.getSuccessRatio(successRatio);
        const args = {
            successRatio,
            title,
            question,
            endTime,
            discussionLink,
            createdTime: Date.now(),
            startTime,
            canister: Principal.fromText(this.state.activeCanister.id),
            options
        }

        icpwallet.addQuestions(args).then(result => {
            console.log("Res", result);
            return true;
        }).catch(err => false);
    }

    handleLoading() {
        this.props.onLoading();
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

    handleChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }

    render() {
        console.log("sub", this.state.isSubmitting);
        const headersData = this.props.headersData;
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
                                <span>GOVERNANCE</span>
                            </h1>
                        </div>
                    </div>
                </div>


                {/* MY ICP Bunny Box*/}
                <div style={{ minHeight: '600px' }}>
                    {/* MY ICP Bunny Heading*/}
                    <div className="row mt-3 ml-5 justify-content-center">
                        <div className="col walet col-lg-10">
                            <h4>Governance &#62; create Proposal</h4>
                        </div>
                    </div>

                    <LoadingMask loading={this.props.loading} loadingText={'Loading...'}>
                        <div className="row mt-3 ml-5 justify-content-start">

                            {/* Breeding Component */}
                            <div className="col-md-4 col-lg-4 col-sm-12">
                                <BreedingComponent
                                    Incubate={this.Incubate}
                                    clickedElement={this.state.clickedElement}
                                    ref={this.myRef}
                                />
                            </div>

                            <div className='row mt-5 ml-5 justify-content-center'>
                                <div className='col-sm-12 col-md-6 col-lg-10 mb-10'>
                                    <div className="main">
                                        <input type="checkbox" checked={this.state.isChecked} de id="chk" aria-hidden="true" />
                                        <div className="login">
                                            <label>Canisters</label>

                                            <div className='card-container'>
                                                {this.props.proposalCanisters !== null &&
                                                    this.props.proposalCanisters.map((canister, index) => {
                                                        const { tokens: { ok } } = canister;
                                                        const length = canister.canisterName === "ICPBunny" ? this.props.detailsArray.length : ok ? ok.length : 0;

                                                        return (
                                                            <div className="card">
                                                                <p className="time-text"><span>{sliceAddress(canister.principal)}</span></p>
                                                                <label htmlFor={"chk"} onClick={() => {
                                                                    length !== 0 && length > 0 &&
                                                                        this.setState({
                                                                            isChecked: !this.state.isChecked,
                                                                            activeCanister: { name: canister.canisterName, id: canister.principal }
                                                                        })
                                                                }
                                                                } className={`day-text ${length > 0 && "active-color"}`}>{canister.canisterName}<span className="time-sub-text ms-3">{canister.canisterName === "ICPBunny" ? this.props.detailsArray.length : length}</span></label>
                                                                {length > 0 ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-patch-check-fill moon" viewBox="0 0 16 16">
                                                                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                                                    </svg>
                                                                    : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="purple" className="bi bi-clipboard-data moon" viewBox="0 0 16 16">
                                                                        <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                                                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                                                    </svg>}
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>

                                        <div className="register">
                                            <i className="bi-chevron-compact-up"></i>
                                            {/* <i className="bi-chevron-compact-down"></i> */}

                                            <label htmlFor="chk"
                                                onClick={() => this.state.isChecked && this.setState({
                                                    isChecked: !this.state.isChecked,
                                                    activeCanister: ""
                                                })}>
                                                <i className="bi bi-x-lg pointer"></i>
                                            </label>
                                            <label aria-hidden="true" >Create Proposal {this.state.activeCanister.name ? `for ${this.state.activeCanister.name}` : ""}</label>
                                            <form className="form row" id='proposal-form' onSubmit={(e) => {
                                                e.preventDefault();
                                                (async () => {
                                                    if (this.state.activeCanister.id) {
                                                        this.setState({
                                                            isSubmitting: true
                                                        })
                                                        if (headersData.nCarrots > 5000) {
                                                            const transferResult = await icpwallet.transferCarrot("aaaaa-aa", 1);
                                                            if (transferResult) {
                                                                this.handleAddQuestion();
                                                                this.setState({
                                                                    isChecked: false
                                                                })
                                                                alert("Proposal submitted!");
                                                            } else {
                                                                alert("Carrots transfer failed!");
                                                            }
                                                        } else {
                                                            alert("Not enough carrots to create proposal!")
                                                        }
                                                        this.setState({
                                                            isSubmitting: false
                                                        })
                                                        document.getElementById("proposal-form").reset();
                                                    } else {
                                                        alert("You can't cheat!!")
                                                    }
                                                })()
                                            }

                                            }>
                                                <input className="input mb-2" type="text" maxLength={100} name="title" placeholder="Title" required onChange={this.handleChange} />
                                                <textarea rows={"4"} className="input" maxlength="200" type="textarea" name="question" placeholder="Question" onChange={this.handleChange} required />

                                                <div className='row justify-content-between'>
                                                    <span className="form-label col-lg-5">Start date</span>
                                                    <span className="form-label col-lg-5">End date</span>
                                                </div>
                                                <div className='row justify-content-between'>
                                                    <input className="input col-lg-5" type="date" name='startDate' id='start_date' onChange={this.handleChange} placeholder='Start time' required />
                                                    <input className="input col-lg-5" type="date" name='endDate' id='end_date' onChange={this.handleChange} placeholder='End time' required />
                                                </div>

                                                <div className='row justify-content-between'>
                                                    <span className="form-label col-lg-5">Start time</span>
                                                    <span className="form-label col-lg-5">End time</span>
                                                </div>
                                                <div className='row justify-content-between mb-3'>
                                                    <input className="input col-lg-5" type="time" name='startTime' onChange={this.handleChange} placeholder='Start time' required />
                                                    <input className="input col-lg-5" type="time" name='endTime' onChange={this.handleChange} placeholder='End time' required />
                                                </div>

                                                <input className="input" type="text" name="discussionLink" onChange={this.handleChange} placeholder="Discussion link" required />
                                                <span className="form-label">Success ratio</span>
                                                <input type="range" name='successRatio' required onChange={this.handleChange} value={this.state.data.successRatio} className="form-range" step="1" min="1" max="5" />
                                                <div className='success-ratio' id='success-ratio'>
                                                    <span>20%</span>
                                                    <span>40%</span>
                                                    <span>60%</span>
                                                    <span>80%</span>
                                                    <span>100%</span>
                                                </div>
                                                <div className='row justify-content-between'>
                                                    <span className="form-label col-lg-9">Options</span>
                                                    <i className="bi bi-plus-square col-lg-1 ps-4 pointer" style={{
                                                        fontSize: "medium"
                                                    }} onClick={() => {
                                                        if (this.state.dynamicInputs.length < 10)
                                                            this.setState({
                                                                dynamicInputs: [...this.state.dynamicInputs, Date.now()]
                                                            })
                                                    }}>

                                                    </i>
                                                </div>
                                                <div id='options-input'>
                                                    {this.state.dynamicInputs.map((id, index) => {
                                                        const no = index + 1;
                                                        return (
                                                            <div className='row justify-content-between align-items-center mb-4' key={`${id}`}>
                                                                <div className="input-group col-lg-12 input">
                                                                    <input className="form-control" type="text" name={`option-${no}`} placeholder={`Option - ${no}`} onChange={this.handleChange} required />
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text">
                                                                            <i className="bi bi-dash-square pointer" onClick={() => {
                                                                                if (no !== 1 && no !== 2) {
                                                                                    const filter = this.state.dynamicInputs.filter((input) => input !== id)
                                                                                    this.setState({
                                                                                        dynamicInputs: filter
                                                                                    })
                                                                                }
                                                                            }}></i>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                                {this.state.isSubmitting ?
                                                    <span className='time-sub-text row justify-content-center mb-5'>Loading...</span>
                                                    : <button disabled={this.state.isSubmitting} type='submit'>{"🔥 5k 🥕 & create proposal"}</button>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadingMask>
                </div>
            </div>
        );
    }
}

export default Proposals;
