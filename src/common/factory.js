/*
Custom changes to StoicWallet code

File: node_modules/ic-stoic-identity/src//index.js

//Muzammil Changes
// const result = JSON.parse(await this.sign(Buffer.from(Buffer.concat([domainSeparator, new Uint8Array(requestId)]))));
const result = JSON.parse(await this.sign(Buffer.from(Buffer.concat([domainSeparator, Buffer.from(new Uint8Array(requestId))]))));
//Muzammil Changes

*/

// Canister Ids
const bunnyCanisterId = 'xkbqi-2qaaa-aaaah-qbpqq-cai';
const carrotCanisterId = '2qrsq-uiaaa-aaaai-aa3zq-cai';
const incubatorCanisterId = 'bqiwn-fqaaa-aaaaf-qae5a-cai';

const storage_array = [];

storage_array[0] = 'efqhu-yqaaa-aaaaf-qaeda-cai';
storage_array[1] = 'h3ba2-7aaaa-aaaaf-qaeka-cai';
storage_array[2] = 'h4ago-syaaa-aaaaf-qaekq-cai';

storage_array[3] = 'fi6d2-xyaaa-aaaaf-qaeeq-cai';
storage_array[4] = 'fb5ig-bqaaa-aaaaf-qaefa-cai';
storage_array[5] = 'fg4os-miaaa-aaaaf-qaefq-cai';

storage_array[6] = 'gynj4-lyaaa-aaaaf-qaemq-cai';
storage_array[7] = 'groca-5qaaa-aaaaf-qaena-cai';
storage_array[8] = 'gwpeu-qiaaa-aaaaf-qaenq-cai';

storage_array[9] = 'f2yud-3iaaa-aaaaf-qaehq-cai';

const carrotFactory = ({ IDL }) => {
  const TokenIdentifier = IDL.Text;
  const AccountIdentifier_2 = IDL.Text;
  const AccountIdentifier = AccountIdentifier_2;
  const User = IDL.Variant({
    principal: IDL.Principal,
    address: AccountIdentifier,
  });
  const BalanceRequest_2 = IDL.Record({
    token: TokenIdentifier,
    user: User,
  });
  const BalanceRequest = BalanceRequest_2;
  const Balance = IDL.Nat;
  const CommonError_2 = IDL.Variant({
    InvalidToken: TokenIdentifier,
    Other: IDL.Text,
  });
  const Result_4 = IDL.Variant({ ok: Balance, err: CommonError_2 });
  const BalanceResponse_2 = Result_4;
  const BalanceResponse = BalanceResponse_2;
  const Memo = IDL.Vec(IDL.Nat8);
  const SubAccount_2 = IDL.Vec(IDL.Nat8);
  const SubAccount = SubAccount_2;
  const TransferRequest_2 = IDL.Record({
    to: User,
    token: TokenIdentifier,
    notify: IDL.Bool,
    from: User,
    memo: Memo,
    subaccount: IDL.Opt(SubAccount),
    amount: Balance,
  });
  const TransferRequest = TransferRequest_2;
  const Result = IDL.Variant({
    ok: Balance,
    err: IDL.Variant({
      CannotNotify: AccountIdentifier,
      InsufficientBalance: IDL.Null,
      InvalidToken: TokenIdentifier,
      Rejected: IDL.Null,
      Unauthorized: AccountIdentifier,
      Other: IDL.Text,
    }),
  });
  const CommonError_10 = IDL.Variant({
    InsufficientBalance: IDL.Null,
    InvalidToken: TokenIdentifier,
    Unauthorized: AccountIdentifier,
    Other: IDL.Text,
  });
  const Result_10 = IDL.Variant({ ok: IDL.Nat, err: CommonError_10 });
  const TransferResponse_2 = Result;
  const TransferResponse = TransferResponse_2;
  const Extension_2 = IDL.Text;
  const Extension = Extension_2;
  const AccountIdentifier_3 = AccountIdentifier;
  const Balance_2 = Balance;
  const TokenIdentifier_2 = TokenIdentifier;
  const Metadata_2 = IDL.Variant({
    fungible: IDL.Record({
      decimals: IDL.Nat8,
      metadata: IDL.Opt(IDL.Vec(IDL.Nat8)),
      name: IDL.Text,
      symbol: IDL.Text,
    }),
    nonfungible: IDL.Record({ metadata: IDL.Opt(IDL.Vec(IDL.Nat8)) }),
  });
  const Metadata = Metadata_2;
  const CommonError = CommonError_2;
  const Result_3 = IDL.Variant({ ok: Metadata, err: CommonError });
  const Result_2 = IDL.Variant({ ok: Balance_2, err: CommonError });
  return IDL.Service({
    acceptCycles: IDL.Func([], [], []),
    availableCycles: IDL.Func([], [IDL.Nat], ['query']),
    balance: IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
    balance_of: IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    totalsupply: IDL.Func([], [IDL.Nat], ['query']),
    holders: IDL.Func([], [IDL.Nat], ['query']),
    carrotTransfer: IDL.Func([TransferRequest], [TransferResponse], []),
    claimCarrots: IDL.Func([], [IDL.Nat], []),
    claimTokenCarrots: IDL.Func([IDL.Nat], [IDL.Text], []),
    extensions: IDL.Func([], [IDL.Vec(Extension)], ['query']),
    getDebug: IDL.Func([], [IDL.Text], ['query']),
    getOwner: IDL.Func([], [IDL.Principal], ['query']),
    getOwners: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(AccountIdentifier_3, Balance_2))],
      []
    ),
    metadata: IDL.Func([TokenIdentifier_2], [Result_3], ['query']),
    registry: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(AccountIdentifier_3, Balance_2))],
      ['query']
    ),
    supply: IDL.Func([TokenIdentifier_2], [Result_2], ['query']),
    totalHolders: IDL.Func([], [Result_10], ['query']),
    testTransfer: IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    transfer: IDL.Func([TransferRequest], [TransferResponse], []),
    walletTransfer: IDL.Func([IDL.Nat, IDL.Text], [IDL.Text], []),
    wallet_receive: IDL.Func([], [IDL.Record({ accepted: IDL.Nat64 })], []),
  });
};

const bunnyFactory = ({ IDL }) => {
  const Property = IDL.Record({ value: IDL.Text, name: IDL.Text });

  const Time = IDL.Int;

  const TokenDesc_2 = IDL.Record({
    id: IDL.Nat,
    url: IDL.Text,
    owner: IDL.Principal,
    desc: IDL.Text,
    name: IDL.Text,
    properties: IDL.Vec(Property),
    date_of_birth: Time,
    storage_canister: IDL.Text,
  });

  const TokenDesc = TokenDesc_2;

  return IDL.Service({
    data_of: IDL.Func([IDL.Nat], [TokenDesc], ['query']),
    user_tokens: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat)], ['query']),
    totalTransfers: IDL.Func([], [IDL.Nat], ['query']),
    individual_holders: IDL.Func([], [IDL.Nat], ['query']),
    transfer_to: IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
  });
};

const incubatorFactory = ({ IDL }) => {
  const Property = IDL.Record({ value: IDL.Text, name: IDL.Text });
  const Time = IDL.Int;
  const TokenDesc_2 = IDL.Record({
    id: IDL.Nat,
    url: IDL.Text,
    owner: IDL.Principal,
    desc: IDL.Text,
    name: IDL.Text,
    properties: IDL.Vec(Property),
    date_of_incubator: Time,
    storage_canister: IDL.Text,
  });
  const TokenDesc = TokenDesc_2;
  const Operation_4 = IDL.Variant({
    init: IDL.Null,
    list: IDL.Null,
    mint: IDL.Null,
    delist: IDL.Null,
    transfer: IDL.Null,
    purchase: IDL.Null,
  });
  const Operation_3 = Operation_4;
  const StorageActor = IDL.Service({
    addRecord: IDL.Func(
      [
        IDL.Principal,
        Operation_3,
        IDL.Opt(IDL.Principal),
        IDL.Opt(IDL.Principal),
        IDL.Nat,
        IDL.Opt(IDL.Nat64),
        Time,
      ],
      [IDL.Nat],
      []
    ),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest_2 = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
  });
  const HttpRequest = HttpRequest_2;
  const StreamingCallbackToken = IDL.Record({
    key: IDL.Text,
    sha256: IDL.Opt(IDL.Vec(IDL.Nat8)),
    index: IDL.Nat,
    content_encoding: IDL.Text,
  });
  const StreamingCallbackResponse = IDL.Record({
    token: IDL.Opt(StreamingCallbackToken),
    body: IDL.Vec(IDL.Nat8),
  });
  const StreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
      token: StreamingCallbackToken,
      callback: IDL.Func(
        [StreamingCallbackToken],
        [StreamingCallbackResponse],
        ['query']
      ),
    }),
  });
  const HttpResponse_2 = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    streaming_strategy: IDL.Opt(StreamingStrategy),
    status_code: IDL.Nat16,
  });
  const HttpResponse = HttpResponse_2;
  const MintRequest_2 = IDL.Record({
    url: IDL.Text,
    dataurl: IDL.Text,
    accountid: IDL.Text,
    contentType: IDL.Text,
    data: IDL.Vec(IDL.Nat8),
    desc: IDL.Text,
    name: IDL.Text,
    properties: IDL.Vec(Property),
    storage_canister: IDL.Text,
  });
  const MintRequest = MintRequest_2;
  const BreedingRequest_2 = IDL.Record({
    desc: IDL.Text,
    name: IDL.Text,
    properties: IDL.Vec(Property),
  });
  const BreedingRequest = BreedingRequest_2;
  return IDL.Service({
    acceptCycles: IDL.Func([], [], []),
    addImageCanister: IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    add_genesis_record: IDL.Func([], [IDL.Nat], []),
    assignTokenId: IDL.Func([IDL.Principal, IDL.Nat], [], ['oneway']),
    availableCycles: IDL.Func([], [IDL.Nat], ['query']),
    claim: IDL.Func([], [IDL.Nat], []),
    data_of: IDL.Func([IDL.Nat], [TokenDesc], ['query']),
    disableBreeding: IDL.Func([], [IDL.Bool], []),
    disableClaim: IDL.Func([], [IDL.Bool], []),
    enableBreeding: IDL.Func([], [IDL.Bool], []),
    enableClaim: IDL.Func([], [IDL.Bool], []),
    enableTransfer: IDL.Func([IDL.Principal, IDL.Nat], [], ['oneway']),
    getAccountID: IDL.Func([], [IDL.Text], []),
    getBalance: IDL.Func([], [IDL.Nat], ['query']),
    getCurrentToken: IDL.Func([], [IDL.Nat], ['query']),
    getImageCanister: IDL.Func([IDL.Nat], [IDL.Text], ['query']),
    getOwner: IDL.Func([], [IDL.Principal], ['query']),
    getOwners: IDL.Func(
      [IDL.Nat],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Nat)))],
      ['query']
    ),
    getPrice: IDL.Func([], [IDL.Nat64], ['query']),
    getRarity: IDL.Func([IDL.Nat], [IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text))], []),
    get_cycles: IDL.Func([], [IDL.Nat], ['query']),
    get_storage_canister: IDL.Func([], [IDL.Opt(StorageActor)], ['query']),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
    individual_holders: IDL.Func([], [IDL.Nat], ['query']),
    mint: IDL.Func([MintRequest], [IDL.Nat], []),
    my_tokens: IDL.Func([], [IDL.Vec(IDL.Nat)], []),
    name: IDL.Func([], [IDL.Text], ['query']),
    nextAccount: IDL.Func([], [IDL.Nat], []),
    owner: IDL.Func([], [IDL.Principal], ['query']),
    owner_of: IDL.Func([IDL.Nat], [IDL.Principal], ['query']),
    remainingMint: IDL.Func([], [IDL.Nat], ['query']),
    remainingTokens: IDL.Func([], [IDL.Nat], ['query']),
    setClaimedTokens: IDL.Func([IDL.Nat], [IDL.Bool], []),
    setData: IDL.Func([], [IDL.Bool], []),
    setIncubator: IDL.Func(
      [IDL.Nat, BreedingRequest, IDL.Nat],
      [TokenDesc],
      []
    ),

    setIncubation: IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Nat, BreedingRequest],
      [TokenDesc],
      []
    ),
    validateParents: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    setPrice: IDL.Func([IDL.Nat64], [IDL.Bool], []),
    set_owner: IDL.Func([IDL.Principal], [IDL.Bool], []),
    set_storage_canister_id: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Bool], []),
    size: IDL.Func([], [IDL.Nat], ['query']),
    symbol: IDL.Func([], [IDL.Text], ['query']),
    tokenAccounts: IDL.Func([IDL.Text], [IDL.Text], []),
    totalTransfers: IDL.Func([], [IDL.Nat], ['query']),
    total_supply: IDL.Func([], [IDL.Nat], ['query']),
    transfer_to: IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    user_tokens: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat)], ['query']),
    wallet_receive: IDL.Func([], [IDL.Record({ accepted: IDL.Nat64 })], []),
  });
};

export {
  bunnyCanisterId,
  carrotCanisterId,
  incubatorCanisterId,
  bunnyFactory,
  carrotFactory,
  incubatorFactory,
  storage_array,
};

//Dummy Data for Properties
/*
const getBunniesPropertiesData2 = async () => {
  log("In getBunniesPropertiesData: START ---------------------------------");

  let gallerydata = [];

  let bunnyPropertiesData = 
  [
      //1
      [
        {
            "value": "Swiss Fox",
            "name": "Breed"
        },
        {
            "value": "0",
            "name": "EarningCapacity"
        },
        {
            "value": "48",
            "name": "LifeSpan"
        },
        {
            "value": "0",
            "name": "BreedingCapacity"
        },
        {
            "value": "F",
            "name": "Gender"
        },
        {
            "value": "Second",
            "name": "Generation"
        },
        {
            "value": "false",
            "name": "3D_Breedable"
        }
      ],
      //2
      [
      {
          "value": "Fluoroantimonic acid",
          "name": "Serum"
      },
      {
          "value": "Is also known as ethanoic acid, ethylic acid, vinegar acid, and methane carboxylic acid",
          "name": "Description"
      },
      {
          "value": "1",
          "name": "Dosage"
      },
      {
          "value": "48",
          "name": "Expiry Date"
      },
      {
          "value": "M",
          "name": "Gender"
      },
      {
          "value": "true",
          "name": "Fertility"
      },
      {
          "value": "false",
          "name": "3D_Breedable"
      }
      ]
    ]
  ;

  let token = {
    id: 0,
    tokenId: 100,
    image: '/images/0.png',
    name: "test 1",
    properties: bunnyPropertiesData[0],
    date_of_birth: "1632453790209363673",    
    isSerum: getTokenType(bunnyPropertiesData[0])
  };

  gallerydata.push(token);

  token = {
    id: 1,
    tokenId: 101,
    image: '/images/1.png',
    name: "test 2",
    properties: bunnyPropertiesData[1],
    date_of_birth: "1632453790209363673",
    isSerum: getTokenType(bunnyPropertiesData[1])
  };

  gallerydata.push(token);  

  log("In getBunniesPropertiesData: END ---------------------------------");
  return gallerydata;
};
*/