import { Principal } from '@dfinity/principal';
import React from 'react';
import LoadingMask from 'react-loadingmask';
import { Link } from 'react-router-dom';
import 'react-loadingmask/dist/react-loadingmask.css';
import { sliceAddress, sliceSentence } from '../common/utils';
import BreedingComponent from '../components/BreedingComponent/BreedingComponent';

const icpwallet = require('../common/ICPPlugWallet');

class DAO extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            clickedElement: null,
            canisterQuestion: {},
            questions: null,
            isLoading: false
        };
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

    fetchQuestions(_principal) {
        this.setState({
            isLoading: true
        });
        icpwallet.getCanisterQuestions(_principal).then(res => {
            console.log("res", res);
            this.setState({
                questions: res,
                isLoading: false
            });
        }).catch(err =>
            this.setState({
                isLoading: false
            }))
    }

    render() {
        console.log("canisterQues", this.props)
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
                        <div className="col walet col-lg-5">
                            <h4>Governance</h4>
                        </div>

                        <Link className="col walet col-lg-5" to="/proposals"
                            aria-current="page">
                            <h4>Create proposals <i class="bi bi-arrow-up-right-square"></i></h4>
                        </Link>
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
                                        <div className="login">
                                            <div className={`row align-items-center ${!this.state.canisterQuestion.principal ? "justify-content-center" : ""}`}>
                                                {this.state.canisterQuestion.principal ? <i className="bi bi-arrow-left ms-5 col-lg-4" onClick={() => {
                                                    this.setState({
                                                        canisterQuestion: {},
                                                        questions: null
                                                    })
                                                }}></i> : ""}
                                                <label className={`ms-7 col-lg-${!this.state.canisterQuestion.principal ? "2" : "5"}`}>Canisters</label>
                                            </div>

                                            {!this.state.canisterQuestion.principal ? <div className='card-container mb-5'>
                                                {this.props.proposalCanisters !== null &&
                                                    this.props.proposalCanisters.map((canister, index) => {
                                                        return (
                                                            <div className="card" key={`${canister.canisterName}-${index}`} onClick={() => {
                                                                this.setState({
                                                                    canisterQuestion: canister
                                                                })
                                                                this.fetchQuestions(canister.principal)
                                                            }}>
                                                                <p className="time-text"><span>{sliceAddress(canister.principal)}</span></p>
                                                                <label className={`day-text active-color`}>{canister.canisterName}</label>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-patch-check-fill moon" viewBox="0 0 16 16">
                                                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                                                </svg>
                                                            </div>
                                                        )
                                                    })}
                                            </div> : this.state.isLoading ? (<span className='time-sub-text row justify-content-center mb-5'>Loading...</span>) : this.state.questions !== null && this.state.questions.length === 0 ? (
                                                <span className='time-sub-text row justify-content-center mb-5'>No Proposals found!</span>
                                            ) :
                                                <div className='mb-5'>
                                                    {this.state.questions.map((que, index) => {
                                                        const no = index + 1;
                                                        return (
                                                            <div className='row mb-4 ms-5 me-5' key={`${que.title}-${no}`}>
                                                                <div className='question-card'>
                                                                    <div className='row justify-content-between align-items-center'>
                                                                        <span className='title col-lg'>
                                                                            <span className='que-no me-3'>
                                                                                #{no}
                                                                            </span>
                                                                            {sliceSentence(que.title)} <span class="badge text-bg-secondary">{que.status[0].status}</span>
                                                                        </span>
                                                                        <span className='goto-proposal col-lg-1'>
                                                                            <Link to={`/proposal/${que.status[0].questionID}`}
                                                                                aria-current="page">
                                                                                <div className='row justify-content-end'>
                                                                                    view
                                                                                </div>
                                                                            </Link>
                                                                        </span>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
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

export default DAO;
