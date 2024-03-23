import React, { useEffect, useRef, useState } from 'react';
import LoadingMask from 'react-loadingmask';
import 'react-loadingmask/dist/react-loadingmask.css';
import { Link } from 'react-router-dom';
import BreedingComponent from '../components/BreedingComponent/BreedingComponent';
import withRouter from '../components/withRouter';
import { Principal } from '@dfinity/principal';
import { sliceAddress } from '../common/utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const icpwallet = require('../common/ICPPlugWallet');

const ProposalDetails = (props) => {

    const [clickedElement, setClickedElement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [radio, setRadio] = useState(null);
    const [votes, setVotes] = useState(null);
    const [voteCounts, setVoteCounts] = useState(null);
    const [totalVoteCounts, setTotalVoteCounts] = useState(null);
    const [isUserVoted, setIsUserVoted] = useState(null);
    const [proposal, setProposal] = useState(null);
    const [userTokens, setUserTokens] = useState(null);
    const myRef = useRef();
    const history = useHistory();

    console.log("proposal", proposal);
    console.log("userTokens", userTokens);
    console.log("votes", votes);
    console.log("isUserVoted", isUserVoted);
    console.log("voteCounts", voteCounts);

    const getVotes = async (queId) => {
        const votes = await icpwallet.getVoteForProposal(queId);
        setVotes(votes);
    }

    const getVotedDetails = async (queId) => {
        const details = await icpwallet.isUserVoted(queId);
        setIsUserVoted(details);
    }

    const handleAddVote = async () => {
        setIsLoading(true);
        const args_ = {
            voter: Principal.fromText(props.principalID),
            storageCanister: Principal.fromText("putek-zaaaa-aaaam-acfma-cai"),
            canister: proposal.canister,
            questionID: proposal.questionID
        };
        const result = await icpwallet.addVoteForProposal(args_, radio, userTokens.length);
        console.log("result", result);
        await getVotes(proposal.questionID);
        await getVotedDetails(args_);
        setIsLoading(false);
    }

    useEffect(() => {
        if (votes !== null && votes.length > 0) {
            let total = 0;
            const votesCount = proposal.options.map(option => {
                let counter = 0
                votes.forEach(vote => {
                    if (option === vote.option) {
                        counter += 1;
                    }
                })
                total += counter
                return { [option]: counter };
            })
            setTotalVoteCounts(total);
            setVoteCounts(votesCount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [votes])

    useEffect(() => {
        if (props.proposalCanisters !== null && proposal?.canister) {
            const principal = Principal.from(proposal.canister).toText();
            const details = props.proposalCanisters.find(canister => canister.principal === principal);
            if (details.tokens.ok) {
                setUserTokens(details.tokens.ok);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.proposalCanisters, proposal])

    useEffect(() => {
        (async () => {
            if (props.principalID) {
                try {
                    const result = await icpwallet.getProposal(Number(props.params.queId));
                    if (result.questionID) {
                        setProposal(result);
                    } else {
                        setProposal([]);
                    }
                    await getVotes(result.questionID);
                    await getVotedDetails({
                        voter: Principal.fromText(props.principalID),
                        storageCanister: Principal.fromText("putek-zaaaa-aaaam-acfma-cai"),
                        canister: result.canister,
                        questionID: result.questionID
                    })
                } catch (error) {
                }
            }
        })();
    }, [props.params.queId, props.principalID])

    const Incubate = async (parentToken1, parentToken2) => {
        if (this.props.headersData.nCarrots < 600) {
            alert('You need a minimum of 600 carrots for Breeding !');
            return;
        }

        const result = await icpwallet.ICPIncubate(parentToken1, parentToken2);
        return result;
    };

    const barColors = [
        'bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-light', 'bg-dark', 'bg-white', "bg-paleGreen"
    ]
    console.log("props.proposalCanisters", props.proposalCanisters);
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
                    <div className="walet col-lg-10">
                        <h4>Governance &#62; Proposal</h4>
                    </div>

                    {/* <Link className="col walet col-lg-5" to="/proposals"
                        aria-current="page">
                        <h4>Create proposals <i className="bi bi-arrow-up-right-square"></i></h4>
                    </Link> */}
                </div>

                <div className="row mt-3 ml-5 justify-content-start">

                    {/* Breeding Component */}
                    <div className="col-md-4 col-lg-4 col-sm-12">
                        <BreedingComponent
                            Incubate={Incubate}
                            clickedElement={clickedElement}
                            ref={myRef}
                        />
                    </div>

                    <div className='row mt-5 ml-5 justify-content-center'>
                        <div className='col-sm-12 col-md-6 col-lg-10 mb-10'>
                            <div className="main">
                                <div className="login">
                                    <div className={`row align-items-center `}>
                                        <i className="bi bi-arrow-left ms-5 col-lg-4" onClick={() => history.goBack()}></i>
                                        <label className={`ms-7 col-lg-2`}>Proposal</label>
                                    </div>
                                </div>

                                {/* Proposal Display */}
                                {proposal === null ? <span className='time-sub-text row justify-content-center mb-5'>Loading...</span> : <div className="center-content mb-5">
                                    <div className="main-wrap">
                                        <div className="wrapper mb-3">
                                            <span className="title ">{proposal.title}</span>
                                            <div className="mt-15">
                                                <span className="success">{proposal.status[0].status}</span>
                                                <span className="grey font-size-17 ms-2">
                                                    {(new Date(Number(proposal.status[0].timestamp) / 1000000)).toString()}
                                                </span>
                                            </div>
                                            <div className="mt-30 white font-size-17">
                                                {proposal.question}
                                            </div>
                                            {userTokens === null || isUserVoted === null ?
                                                <span className='time-sub-text row justify-content-center mt-4'>Loading...</span>
                                                :
                                                userTokens.length > 0 && !isUserVoted ?
                                                    <div className="mt-15 radio-wrapper">
                                                        <div className="white font-size-20">Options</div>
                                                        <form className='row radio-container' onSubmit={(e) => {
                                                            e.preventDefault();
                                                            if (radio) {
                                                                handleAddVote();
                                                            } else {
                                                                alert("Options can't empty!")
                                                            }
                                                        }} style={{ width: "auto" }}>

                                                            {
                                                                proposal.options.map((opt) => {
                                                                    return (
                                                                        <>
                                                                            <label className='mt-2 row-cols-2' style={{ width: "auto" }}>
                                                                                <input type="radio" onChange={() => setRadio(opt)} name="option" />
                                                                                <span>{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                                                                            </label>
                                                                        </>
                                                                    )
                                                                })
                                                            }

                                                            {isLoading ?
                                                                <span className='time-sub-text row justify-content-center mt-2'>Adding your vote...</span>
                                                                :
                                                                <button className='btn-submit mt-2' style={{
                                                                    marginBottom: "0px"
                                                                }} type='submit'>Cast your vote</button>}

                                                        </form>
                                                    </div>
                                                    : <span className='time-sub-text row justify-content-center mt-4'>Your vote counted!</span>


                                            }
                                            <div className="mt-15 row font-size-17">
                                                <span className='col-lg-3'>
                                                    <a href={proposal.discussionLink} className='redirect-link' target="_blank" aria-current="page" rel="noreferrer">
                                                        View discussion <i class="bi bi-box-arrow-up-right"></i>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>

                                        <div className='col-lg-12 row justify-content-between'>
                                            <div className="details-container col-lg-4">
                                                <div className="white font-size-20">Details</div>
                                                <div className="row justify-content-between mt-15">
                                                    <div className='col-lg-4'>
                                                        <div className="white">Created by</div>
                                                    </div>
                                                    <div className='col-lg-8'>
                                                        <div className="grey">: {sliceAddress(Principal.from(proposal.creator).toText())}</div>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-between mt-15">
                                                    <div className='col-lg-4'>
                                                        <div className="white">Success ratio</div>
                                                    </div>
                                                    <div className='col-lg-8'>
                                                        <div className="grey">: {Number(proposal.successRatio)} %</div>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-between mt-15">
                                                    <div className='col-lg-4'>
                                                        <div className="white">Start</div>
                                                    </div>
                                                    <div className='col-lg-8'>
                                                        <div className="grey">: {new Date(Number(proposal.startTime)).toUTCString()}</div>
                                                    </div>

                                                </div>
                                                <div className="row justify-content-between mt-15">
                                                    <div className='col-lg-4'>
                                                        <div className="white">End</div>
                                                    </div>
                                                    <div className='col-lg-8'>
                                                        <div className="grey">: {new Date(Number(proposal.endTime)).toUTCString()}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="details-container col-lg-5">
                                                {voteCounts === null || userTokens === null ?
                                                    <span className='time-sub-text row justify-content-center mb-5'>Loading...</span>
                                                    : userTokens.length === 0 ?
                                                        <span className='time-sub-text row justify-content-center mb-5'>Sorry!, You are not allowed to poll.</span>
                                                        :
                                                        (<>
                                                            <div className="white font-size-20">Current results</div>
                                                            <div className="mt-15">
                                                                <div className="progress">
                                                                    {
                                                                        voteCounts.map((opt, index) => {
                                                                            const [_, count] = Object.entries(opt)[0];
                                                                            const percentage = (count / totalVoteCounts) * 100;
                                                                            return (
                                                                                <div className={`progress-bar ${barColors[index]}`} role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
                                                                            )
                                                                        })
                                                                    }
                                                                    {/* <div className="progress-bar bg-success" role="progressbar" style={{ width: "30%" }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    <div class="progress-bar bg-info" role="progressbar" style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div> */}
                                                                </div>
                                                            </div>
                                                            <div className="row justify-content-between mt-15">
                                                                <div className='col-lg-6'>
                                                                    <div className="white">votes</div>
                                                                    <div className="grey">{totalVoteCounts !== null ? totalVoteCounts : 0}</div>
                                                                </div>
                                                                {/* <div className='col-lg-5'>
                                                                    <div className="white">Min threshold</div>
                                                                    <div className="grey">60,000,000.00</div>
                                                                </div> */}
                                                            </div>
                                                            <div className="row justify-content-between mt-15">
                                                                {
                                                                    voteCounts.map((opt, index) => {
                                                                        const [option, count] = Object.entries(opt)[0];
                                                                        const percentage = (count / totalVoteCounts) * 100;
                                                                        return (
                                                                            <>
                                                                                <div className="white font-size-17 col-lg-6 row align-items-center justify-content-between"><div className={`dotted col-lg-1 ${percentage ? barColors[index] : "bg-white"}`}></div> <span className='col-lg-10'>   {option}</span> </div>
                                                                                <div className="grey font-size-17 col-lg-5">{percentage ? percentage : 0} % {`(${count})`}</div>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(ProposalDetails);
