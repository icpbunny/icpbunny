import { nFormatter, log } from '../common/utils';
import { Principal } from '@dfinity/principal';
import { StoicIdentity } from './stoicwallet';
import { HttpAgent, Actor } from '@dfinity/agent';
import {
  bunnyCanisterId,
  carrotCanisterId,
  incubatorCanisterId,
  bunnyFactory,
  carrotFactory,
  incubatorFactory,
  storage_array,
  daoCanisterId,
  daoFactory,
  tokensFactory
} from './factory';

let g_myTokens = [];
let g_principalID = null;
let g_bunnyActor = null;
let g_carrotActor = null;
let g_incubatorActor = null;
let g_daoActor = null;
let g_accountID = null;
let g_no_of_incubation_days = 10;

const g_StoicURL = 'https://ic0.app';
const g_PlugURL = 'https://mainnet.dfinity.network';

const g_BreedingCost = '1200';

const initPlugWallet = async () => {
  //Testing = hv2el-fyaaa-aaaah-qcenq-cai
  //Production = 2qrsq-uiaaa-aaaai-aa3zq-cai
  // Whitelist
  const whitelist = [bunnyCanisterId, carrotCanisterId, incubatorCanisterId, daoCanisterId];

  if (window.ic === undefined) {
    // alert("Please install the Plug Extension to continue.");
    return 0;
  }

  let result = '';
  let connectionState = '';

  try {
    result = await window.ic.plug.requestConnect({
      whitelist,
      host: g_PlugURL,
    });

    connectionState = result ? 'allowed' : 'denied';
    log(`The Connection was ${connectionState}!`);
  } catch (e) {
    connectionState = result ? 'allowed' : 'denied';
    log('Exception in window.ic.plug.requestConnect ');
    log(`The Connection was ${connectionState}!`);
    return -1;
  }

  g_bunnyActor = await window.ic.plug.createActor({
    canisterId: bunnyCanisterId,
    interfaceFactory: bunnyFactory,
  });

  g_carrotActor = await window.ic.plug.createActor({
    canisterId: carrotCanisterId,
    interfaceFactory: carrotFactory,
  });

  g_incubatorActor = await window.ic.plug.createActor({
    canisterId: incubatorCanisterId,
    interfaceFactory: incubatorFactory,
  });

  g_daoActor = await window.ic.plug.createActor({
    canisterId: daoCanisterId,
    interfaceFactory: daoFactory,
  });

  g_principalID = await window.ic.plug.agent.getPrincipal();

  return 1;
};

const initStoicWallet = async () => {
  let identity = null;

  try {
    identity = await StoicIdentity.connect();
  } catch (error) {
    log('Exception in StoicIdentity.connect');
    return -1;
  }

  //Create a bunny Actor
  g_bunnyActor = Actor.createActor(bunnyFactory, {
    agent: new HttpAgent({
      identity: identity,
      host: g_StoicURL,
    }),
    canisterId: bunnyCanisterId,
  });

  //Create a carrot Actor
  g_carrotActor = Actor.createActor(carrotFactory, {
    agent: new HttpAgent({
      identity: identity,
      host: g_StoicURL,
    }),
    canisterId: carrotCanisterId,
  });

  //Create a incubator actor
  g_incubatorActor = Actor.createActor(incubatorFactory, {
    agent: new HttpAgent({
      identity: identity,
      host: g_StoicURL,
    }),
    canisterId: incubatorCanisterId,
  });

  //Create a DAO actor
  g_incubatorActor = Actor.createActor(daoFactory, {
    agent: new HttpAgent({
      identity: identity,
      host: g_StoicURL,
    }),
    canisterId: daoCanisterId,
  });

  g_principalID = identity.getPrincipal();

  return 1;
};

const getPrincipal = () => {
  return g_principalID.toText();
};

const getBunniesImageData = async () => {
  log('In getBunniesImageData: START ---------------------------------');

  let gallerydata = [];

  try {
    if (g_bunnyActor != null) {
      g_myTokens = await g_bunnyActor.user_tokens(g_principalID);

      log('myTokens = ' + g_myTokens);

      const MAX_TOKENS = g_myTokens.length;
      // const MAX_TOKENS = 2;

      let img = '';

      for (var i = 0; i < MAX_TOKENS; i++) {
        var t = g_myTokens[i] + '';
        log('Loading images ' + (i + 1) + '/' + MAX_TOKENS + ', ' + t);

        var isMap = false;

        if (parseInt(t) >= 10000) {
          isMap = true;
        }

        let canisterIndex = parseInt(t) % 10;
        let storageCanister = storage_array[canisterIndex];

        img = 'https://' + storageCanister + '.raw.ic0.app/Token/' + t;

        // log("img = " + img);
        const token = {
          id: i,
          tokenId: t,
          image: img,
          name: '',
          properties: '',
          isMap: isMap,
        };

        gallerydata.push(token);
      }
    }
  } catch (e) {
    log('Exception in getBunniesImageData = ' + e);
  }

  log('In getBunniesImageData: END ---------------------------------');
  return gallerydata;
};

const getBunniesPropertiesData = async () => {
  log('In getBunniesPropertiesData: START ---------------------------------');

  if (g_bunnyActor != null) {
    g_myTokens = await g_bunnyActor.user_tokens(g_principalID);
  }

  return new Promise((resolve, reject) => {
    let gallerydata = [];

    const MAX_TOKENS = g_myTokens.length;

    let promiseArray = [];

    //Push all the calls here
    for (var i = 0; i < MAX_TOKENS; i++) {
      var t = g_myTokens[i] + '';

      promiseArray.push(g_bunnyActor.data_of(parseInt(t)).then());
    }

    //Receive all the responses here
    Promise.all(promiseArray).then((values) => {
      for (var i = 0; i < MAX_TOKENS; i++) {
        var t = g_myTokens[i] + '';

        log('================================================');
        log('Loading details ' + (i + 1) + '/' + MAX_TOKENS + ', ' + t);

        let bunnyData = values[i];

        let canisterIndex = parseInt(t) % 10;
        let storageCanister = storage_array[canisterIndex];
        let img = 'https://' + storageCanister + '.raw.ic0.app/Token/' + t;

        const token = {
          id: i,
          tokenId: t,
          image: img,
          name: bunnyData.name,
          properties: bunnyData.properties ? bunnyData.properties : null,
          date_of_birth: bunnyData.date_of_birth
            ? bunnyData.date_of_birth
            : null,
          isSerumType: isSerumType(
            bunnyData.properties ? bunnyData.properties : false
          ),
          isMap: t >= 10000 ? true : false,
        };

        gallerydata.push(token);
      }

      log('In getBunniesPropertiesData: END -------------------------');

      resolve(gallerydata);
    });
  });
};

//------------------------------------------------------------------------
//1
const getHoldersCount = () => {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        if (g_bunnyActor != null) {
          let no_of_individual_holdersInt = 0;
          let no_of_individual_holdersBigInt =
            await g_bunnyActor.individual_holders();
          let no_of_individual_holdersString =
            no_of_individual_holdersBigInt + '';
          no_of_individual_holdersInt = parseInt(
            no_of_individual_holdersString
          );
          resolve(no_of_individual_holdersInt);
        }
      })();
    } catch (error) {
      log('Exception in getHoldersCount = ' + error);
      reject(error);
    }
  });
};

//2
const getTransferCount = () => {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        if (g_bunnyActor != null) {
          let transferCountInt = 0;
          let transferCountBigInt = await g_bunnyActor.totalTransfers();
          let transferCountString = transferCountBigInt + '';
          transferCountInt = parseInt(transferCountString);
          resolve(transferCountInt);
        }
      })();
    } catch (error) {
      reject(error);
    }
  });
};

//3
const getCarrotsCount = () => {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        if (g_carrotActor != null && g_principalID != null) {
          let no_of_Carrots_Int = 0;
          let no_of_CarrotsBigInt = await g_carrotActor.balance_of(
            g_principalID
          );
          let no_of_CarrotsString = no_of_CarrotsBigInt + '';
          no_of_Carrots_Int = parseInt(no_of_CarrotsString);
          resolve(no_of_Carrots_Int);
        }
      })();
    } catch (error) {
      log('Exception in getCarrotsCount = ' + error);
      reject(error);
    }
  });
};

//4
const getTotalCarrotsSupply = () => {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        if (g_carrotActor != null) {
          let no_of_Carrots_Int = 0;
          let no_of_CarrotsBigInt = await g_carrotActor.totalsupply();
          let no_of_CarrotsString = no_of_CarrotsBigInt + '';
          no_of_Carrots_Int = parseInt(no_of_CarrotsString);
          log('no_of_Carrots_Int = ' + no_of_Carrots_Int);
          resolve(no_of_Carrots_Int);
        }
      })();
    } catch (error) {
      log('Exception in getTotalCarrotsSupply = ' + error);
      reject(error);
    }
  });
};

//5
const getTotalCarrotHolders = async () => {
  let no_of_Carrots_Int = 0;

  try {
    if (g_carrotActor != null) {
      let no_of_CarrotsBigInt = await g_carrotActor.totalHolders();
      let no_of_CarrotsString = no_of_CarrotsBigInt.ok + '';
      no_of_Carrots_Int = parseInt(no_of_CarrotsString);
    }
  } catch (e) {
    log('Exception in getTotalCarrotHolders = ' + e);
  }
  return no_of_Carrots_Int;
};

//Get 5 Headers Data
const getHeadersData = () => {
  return new Promise((resolve, reject) => {
    let nHolders = getHoldersCount();

    let nTransfers = getTransferCount();

    let nCarrotsFromServer = getCarrotsCount();

    let nTotalCarrotsSupply = getTotalCarrotsSupply();

    let nTotalCarrotHolders = getTotalCarrotHolders();

    Promise.all([
      nHolders,
      nTransfers,
      nCarrotsFromServer,
      nTotalCarrotsSupply,
      nTotalCarrotHolders,
    ]).then((values) => {
      log(values);

      let nHolders = nFormatter(values[0], 2);

      let nTransfers = nFormatter(values[1], 2);

      let nCarrots = values[2] / 100000000;
      let nCarrotsDisplay = values[2] / 100000000;
      nCarrotsDisplay = nFormatter(nCarrotsDisplay, 2);

      let nTotalCarrotsSupply = nFormatter(values[3], 2);

      let nTotalCarrotHolders = nFormatter(values[4], 2);

      const result = {
        nHolders: nHolders,
        nTransfers: nTransfers,

        nCarrots: nCarrots,
        nCarrotsDisplay: nCarrotsDisplay,

        nTotalCarrotsSupply: nTotalCarrotsSupply,
        nTotalCarrotHolders: nTotalCarrotHolders,
      };

      resolve(result);
    });
  });
};
//------------------------------------------------------------------------

const isSerumType = (properties) => {
  let result = false;

  for (let index = 0; index < properties.length; index++) {
    const element = properties[index];

    if (element.name === 'Serum') {
      result = true;
      return result;
    }
  }

  return result;
};

const getBunnyData = async (bunnyId) => {
  let data;

  try {
    const bunnyData = await g_bunnyActor.data_of(bunnyId);

    log('bunnyData.storage_canister = ' + bunnyData.storage_canister);

    let img =
      'https://' +
      bunnyData.storage_canister +
      '.raw.ic0.app/Token/' +
      bunnyData.id;

    log('img = ' + img);

    data = {
      tokenId: bunnyId,
      image: img,
      name: bunnyData.name,
      properties: bunnyData.properties,
      date_of_birth: bunnyData.date_of_birth,
    };
  } catch (e) {
    log('Exception in getBunnyData = ' + e);
  }

  return data;
};

const claimCarrots = async () => {
  let result;

  try {
    if (g_carrotActor != null) {
      result = await g_carrotActor.claimCarrots();

      let carrotString = result + '';
      let carrots = parseInt(carrotString);

      result = carrots / 100000000;
      log(result);

      return result;
    }
  } catch (e) {
    log('Exception in claimCarrots = ' + e);
  }
};

const transferBunny = async (principleId, tokenId) => {
  log('In transferBunny ' + principleId + ', ' + tokenId);

  let result;

  try {
    let userPrincipal = Principal.fromText(principleId);

    result = await g_bunnyActor.transfer_to(userPrincipal, tokenId);

    log('Transfer Result = ' + result);
  } catch (e) {
    log('Exception in transferBunny = ' + e);
    alert(
      'Error while Transferring Bunny.\nPlease check if the Principal Id is correct.'
    );
  }

  return result;
};

const transferCarrot = async (destination_principal_ID, nCarrots) => {
  let result;

  try {
    log('In transferCarrot ' + destination_principal_ID + ', ' + nCarrots);

    nCarrots = nCarrots * 100000000;

    result = await g_carrotActor.walletTransfer(
      nCarrots,
      destination_principal_ID
    );

    log('Transfer Result = ' + result);
  } catch (e) {
    log('Exception in transferCarrot = ' + e);
  }
  return result;
};

async function IncubatorUpdateCallback() {
  // log('IncubatorUpdateCallback: ====================================');
  // log('IncubatorUpdateCallback: START');

  var incubatorTokens = [];

  if (g_incubatorActor != null) {
    incubatorTokens = await g_incubatorActor.user_tokens(g_principalID);
    // log("incubatorTokens = " + incubatorTokens);
  }

  let gallerydata = [];

  for (var i = 0; i < incubatorTokens.length; i++) {

    const bunnyData = await g_incubatorActor.data_of(parseInt(incubatorTokens[i]));

    // log(JSON.stringify(toJson(bunnyData), null, 4));

    const babyBunnyId = parseInt(bunnyData.properties[2].value);
    // log("babyBunnyId = " + babyBunnyId);

    const date_of_incubation_s = parseInt(bunnyData.properties[4].value);
    // log("date_of_incubation = " + date_of_incubation_s);

    var date_of_birth_s = parseInt(bunnyData.properties[5].value);
    // log("date_of_birth_s = " + date_of_birth_s);

    if (parseInt(date_of_birth_s) === 0) {
      date_of_birth_s = date_of_incubation_s + (86400 * g_no_of_incubation_days);
    }

    const currentTime = new Date().getTime();
    const temp_incubation_end_time_ms = date_of_birth_s * 1000;

    var babyBunnyIdProp = null;
    var incubation_end_time_ms = null;

    if (babyBunnyId !== 0) {
      log('BABY BUNNY HAS BEEN DELIVERED');

      babyBunnyIdProp = babyBunnyId;
    } else {
      if (currentTime > temp_incubation_end_time_ms) {
        log('Incubation time has passed, CLAIM YOUR BABY BUNNY');

      } else {
        log('You are inside the Incubation period, DISPLAY TIMER');

        incubation_end_time_ms = temp_incubation_end_time_ms;
      }
    }

    const properties = {
      babyBunnyId: babyBunnyIdProp,
      incubation_end_time_ms: incubation_end_time_ms,
    };

    const token = {
      id: i,
      tokenId: incubatorTokens[i],
      properties: properties,
    };
    gallerydata.push(token);

  }

  // log('IncubatorUpdateCallback: END');
  // log('IncubatorUpdateCallback: &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

  return gallerydata;
}

const getIncubationsData = async () => {
  // log('In getIncubationsData: START');

  // setInterval(function () {IncubatorUpdateCallback();}, 4000);

  return await IncubatorUpdateCallback();
};

const ICPIncubate = async (parentToken1, parentToken2) => {
  log('In ICPIncubate: START');

  let res = false;

  try {
    var isParentsBreeding = await g_incubatorActor.validateParents(
      parseInt(parentToken1),
      parseInt(parentToken2)
    );

    log('isParentsBreeding = ' + isParentsBreeding);

    if (parseInt(isParentsBreeding) === 100) {
      alert(
        'Parent 1 is already incubating a BabyBunny, please select another Bunny for Parent 1.'
      );
      return;
    } else if (parseInt(isParentsBreeding) === 200) {
      alert(
        'Parent 2 is already incubating a BabyBunny, please select another Bunny for Parent 2.'
      );
      return;
    } else if (parseInt(isParentsBreeding) === 300) {
      alert(
        'Both Bunnies are already incubating a BabyBunny, please select other parents.'
      );
      return;
    } else if (parseInt(isParentsBreeding) === 500) {
      alert('Breeding has ended for the current Season.');
      return;
    } else if (parseInt(isParentsBreeding) === 400) {
      log('Calling transfer');

      g_accountID = await g_incubatorActor.getAccountID();
      log('Breeding account id = ' + g_accountID);

      let nCarrots = parseInt(g_BreedingCost) * 100000000;
      let result = '';

      alert(
        'Breeding BabyBunny costs ' +
        g_BreedingCost +
        ' ICPCarrots.\nTransferring ' +
        g_BreedingCost +
        ' ICPCarrots now...'
      );
      result = await g_carrotActor.walletTransfer(
        nCarrots,
        'o2xbb-35ogf-ubxys-gujz4-4hzfv-uhbz7-6zpw6-xogud-ainy6-jayiz-wae'
      );
      log('Transfer Result = ' + result);

      if (result.includes('Transfer Successful!')) {
        alert(
          'You have successfully transferred ' + g_BreedingCost + ' ICPCarrots'
        );

        var date_of_birth = new Date();
        date_of_birth.setDate(date_of_birth.getDate() + g_no_of_incubation_days);
        log(date_of_birth);

        var breedingRequest = {
          name: 'Bunny',
          desc: 'Incubator',
          properties: [
            { name: 'Parent-1', value: parentToken1 }, // Parent 1
            { name: 'Parent-2', value: parentToken2 }, // Parent 2
            { name: 'Baby_Bunny', value: '0' }, // Keep it zero only after delivery
            { name: 'Owner', value: getPrincipal() }, // Parents owner Principal
            {
              name: 'date_of_breeding', value: Math.floor(Date.now() / 1000) + '',
            }, //Unixtimestamp of today
            {
              name: 'date_of_birth', value: Math.floor(date_of_birth / 1000) + '',
            }, // 0

            { name: 'storage_canister', value: 'Not set' }, // “Not set”
            { name: 'paid_account', value: g_accountID }, // Account id
            { name: 'breeding_cost', value: g_BreedingCost }, // 1200
          ],
        };

        var code = 5871; // Password
        // var incubatorID = await incubatorActor.getIncubatorID(); [i have to code - hardcode to 100]
        // var incubatorID = 100;

        log('Calling setIncubation');
        var _incubateBunny = await g_incubatorActor.setIncubation(
          parseInt(parentToken1),
          parseInt(parentToken2),
          code,
          breedingRequest
        );
        log('_incubateBunny.id = ' + _incubateBunny.id);

        if (_incubateBunny && _incubateBunny.id > 0) {
          alert(
            _incubateBunny.id +
            ' is your incubator NFT. Your BabyBunny will be delivered after 10 days.'
          );
        }

        res = true;
      } else {
        res = false;
      }
    }
  } catch (e) {
    log('Exception in ICPIncubate = ' + e);
  }

  log('In ICPIncubate: END');

  return res;
};

const getCanisterData = async () => {
  try {
    if (g_daoActor != null) {
      try {
        const canisters = await g_daoActor.getCanisters();

        const revealedCanisters = canisters.map((canister) => {
          const [_, principal] = canister;

          return { canisterName: principal.canisterName, principal: Principal.from(principal.canister).toText() }
        })
        const promises = revealedCanisters.map((canister) => {

          return new Promise(async res => {
            const actor = await window?.ic.plug.createActor({
              canisterId: canister.principal,
              interfaceFactory: tokensFactory,
            });
            res({ ...canister, fn: actor.tokens });
          })

        });
        const actors = await Promise.all(promises);
        log("actors", actors);

        return actors;
      } catch (error) {
        log("Actors creation error", error);
      }

    }
  } catch (error) {
    log("DAO getCanister error", error);
  }
}

const addQuestions = async ({
  successRatio,
  title,
  question,
  endTime,
  discussionLink,
  startTime,
  canister,
  options
}) => {
  if (g_daoActor != null) {
    const queArgs = {
      successRatio,
      title,
      question,
      endTime,
      discussionLink,
      startTime,
      canister,
      options,
    }
    try {
      const result = await g_daoActor.addQuestion(queArgs);
      return result;
    } catch (error) {
      log("Add Ques error", error);
    }
  }
}

const getCanisterQuestions = async (_principal) => {
  try {
    const canisterQues = await g_daoActor.getCanisterQuestions(Principal.fromText(_principal));
    return canisterQues
  } catch (error) {
    log("Get Canister Questions error", error);
  }
}

const getProposal = async (_queId) => {
  try {
    const proposal = await g_daoActor.getQuestion(_queId);
    return proposal;
  } catch (error) {
    console.log("Get Canister Questions error", error);
  }
}

const addVoteForProposal = async (_args, _option, _votes) => {
  try {
    const votes = await g_daoActor.addVotes(_args, _option, _votes);
    return votes;
  } catch (error) {
    console.log("Add votes error", error);
  }
}

const getVoteForProposal = async (_queId) => {
  try {
    const votes = await g_daoActor.getVotes(_queId);
    return votes;
  } catch (error) {
    console.log("Add votes error", error);
  }
}

const isUserVoted = async (_args) => {
  try {
    const votedDetails = await g_daoActor.isUserVoted(_args);
    return votedDetails;
  } catch (error) {
    console.log("Add votes error", error);
  }
}

export {
  initPlugWallet,
  initStoicWallet,
  getHoldersCount,
  getBunniesImageData,
  getBunnyData,
  getBunniesPropertiesData,
  getTransferCount,
  transferBunny,
  claimCarrots,
  getProposal,
  getCarrotsCount,
  getTotalCarrotsSupply,
  getTotalCarrotHolders,
  addVoteForProposal,
  getVoteForProposal,
  isUserVoted,
  transferCarrot,
  getPrincipal,
  getCanisterQuestions,
  addQuestions,
  ICPIncubate,
  getHeadersData,
  getIncubationsData,
  getCanisterData
};
