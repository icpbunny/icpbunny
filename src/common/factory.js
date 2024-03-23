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
const daoCanisterId = 'putek-zaaaa-aaaam-acfma-cai';

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

const daoFactory = ({ IDL }) => {
  const CanisterInfo = IDL.Record({
    'canisterName': IDL.Text,
    'canister': IDL.Principal,
  });
  const Time = IDL.Int;
  const QuestionInfo = IDL.Record({
    'startTime': Time,
    'successRatio': IDL.Nat,
    'title': IDL.Text,
    'question': IDL.Text,
    'endTime': Time,
    'discussionLink': IDL.Text,
    'canister': IDL.Principal,
    'options': IDL.Vec(IDL.Text),
  });
  const VoterInfo = IDL.Record({
    'voter': IDL.Principal,
    'storageCanister': IDL.Principal,
    'canister': IDL.Principal,
    'questionID': IDL.Nat32,
  });
  const QuestionStatus = IDL.Record({
    'status': IDL.Text,
    'timestamp': Time,
    'questionID': IDL.Nat32,
  });
  const QuestionDetails = IDL.Record({
    'startTime': Time,
    'status': IDL.Vec(QuestionStatus),
    'successRatio': IDL.Nat,
    'title': IDL.Text,
    'creator': IDL.Principal,
    'question': IDL.Text,
    'endTime': Time,
    'discussionLink': IDL.Text,
    'canister': IDL.Principal,
    'questionID': IDL.Nat32,
    'options': IDL.Vec(IDL.Text),
  });
  const VoterDetails = IDL.Record({
    'voter': IDL.Principal,
    'voteIndex': IDL.Nat32,
    'canister': IDL.Principal,
    'questionID': IDL.Nat32,
  });
  const Answers = IDL.Record({
    'option': IDL.Text,
    'votes': IDL.Nat,
    'voterDetails': VoterDetails,
  });
  return IDL.Service({
    'acceptCycles': IDL.Func([], [], []),
    'addCanister': IDL.Func([IDL.Nat, CanisterInfo], [IDL.Bool], []),
    'addQuestion': IDL.Func([QuestionInfo], [IDL.Bool], []),
    'addVotes': IDL.Func([VoterInfo, IDL.Text, IDL.Nat], [IDL.Bool], []),
    'availableCycles': IDL.Func([], [IDL.Nat], ['query']),
    'getAccountID': IDL.Func([IDL.Principal], [IDL.Text], []),
    'getCanisterQuestions': IDL.Func(
      [IDL.Principal],
      [IDL.Vec(QuestionDetails)],
      ['query'],
    ),
    'getCanisters': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Nat, CanisterInfo))],
      ['query'],
    ),
    'getQuestion': IDL.Func([IDL.Nat32], [QuestionDetails], ['query']),
    'getQuestions': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Nat32, QuestionDetails))],
      ['query'],
    ),
    'getVotes': IDL.Func([IDL.Nat32], [IDL.Vec(Answers)], ['query']),
    'isUserVoted': IDL.Func([VoterInfo], [IDL.Bool], ['query']),
    'removeCanister': IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    'wallet_receive': IDL.Func(
      [],
      [IDL.Record({ 'accepted': IDL.Nat64 })],
      [],
    ),
  });
}

// Comnmon for all token eg(Boxy dude, NFT etc...)
const tokensFactory = ({ IDL }) => {
  const AssetHandle = IDL.Text;
  const AccountIdentifier__1 = IDL.Text;
  const TransactionDetail = IDL.Record({
    'principal': IDL.Principal,
    'accountid': AccountIdentifier__1,
    'transaction': IDL.Text,
    'timestamp': IDL.Nat64,
  });
  const TokenIndex = IDL.Nat32;
  const SubAccount__1 = IDL.Vec(IDL.Nat8);
  const TokenIdentifier = IDL.Text;
  const AccountIdentifier = IDL.Text;
  const User = IDL.Variant({
    'principal': IDL.Principal,
    'address': AccountIdentifier,
  });
  const BalanceRequest = IDL.Record({
    'token': TokenIdentifier,
    'user': User,
  });
  const Balance = IDL.Nat;
  const CommonError__1 = IDL.Variant({
    'InvalidToken': TokenIdentifier,
    'Other': IDL.Text,
  });
  const BalanceResponse = IDL.Variant({
    'ok': Balance,
    'err': CommonError__1,
  });
  const TokenIdentifier__1 = IDL.Text;
  const CommonError = IDL.Variant({
    'InvalidToken': TokenIdentifier,
    'Other': IDL.Text,
  });
  const Result_7 = IDL.Variant({
    'ok': AccountIdentifier__1,
    'err': CommonError,
  });
  const Time = IDL.Int;
  const Listing = IDL.Record({
    'locked': IDL.Opt(Time),
    'seller': IDL.Principal,
    'price': IDL.Nat64,
  });
  const Result_10 = IDL.Variant({
    'ok': IDL.Tuple(AccountIdentifier__1, IDL.Opt(Listing)),
    'err': CommonError,
  });
  const AssetId = IDL.Nat32;
  const ChunkId = IDL.Nat32;
  const AssetType = IDL.Variant({
    'other': IDL.Text,
    'canister': IDL.Record({ 'id': AssetId, 'canister': IDL.Text }),
    'direct': IDL.Vec(ChunkId),
  });
  const Extension = IDL.Text;
  const ListRequest = IDL.Record({
    'token': TokenIdentifier__1,
    'from_subaccount': IDL.Opt(SubAccount__1),
    'price': IDL.Opt(IDL.Nat64),
  });
  const Result_3 = IDL.Variant({ 'ok': IDL.Null, 'err': CommonError });
  const MetadataValue = IDL.Tuple(
    IDL.Text,
    IDL.Variant({
      'nat': IDL.Nat,
      'blob': IDL.Vec(IDL.Nat8),
      'nat8': IDL.Nat8,
      'text': IDL.Text,
    }),
  );
  const MetadataContainer = IDL.Variant({
    'blob': IDL.Vec(IDL.Nat8),
    'data': IDL.Vec(MetadataValue),
    'json': IDL.Text,
  });
  const Metadata = IDL.Variant({
    'fungible': IDL.Record({
      'decimals': IDL.Nat8,
      'metadata': IDL.Opt(MetadataContainer),
      'name': IDL.Text,
      'symbol': IDL.Text,
    }),
    'nonfungible': IDL.Record({
      'thumbnail': IDL.Text,
      'asset': IDL.Text,
      'metadata': IDL.Opt(MetadataContainer),
      'name': IDL.Text,
    }),
  });
  const Result_9 = IDL.Variant({
    'ok': IDL.Tuple(AccountIdentifier__1, IDL.Nat64),
    'err': CommonError,
  });
  const Transaction = IDL.Record({
    'token': TokenIndex,
    'time': Time,
    'seller': AccountIdentifier__1,
    'buyer': AccountIdentifier__1,
    'price': IDL.Nat64,
  });
  const Result_8 = IDL.Variant({ 'ok': Metadata, 'err': CommonError });
  const PaymentType = IDL.Variant({
    'nft': TokenIndex,
    'nfts': IDL.Vec(TokenIndex),
    'sale': IDL.Nat64,
  });
  const Payment = IDL.Record({
    'expires': Time,
    'subaccount': SubAccount__1,
    'payer': AccountIdentifier__1,
    'amount': IDL.Nat64,
    'purchase': PaymentType,
  });
  const SalePricingGroup = IDL.Record({
    'end': Time,
    'participants': IDL.Vec(AccountIdentifier__1),
    'name': IDL.Text,
    'limit': IDL.Tuple(IDL.Nat64, IDL.Nat64),
    'pricing': IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    'start': Time,
  });
  const SaleRemaining = IDL.Variant({
    'retain': IDL.Null,
    'burn': IDL.Null,
    'send': AccountIdentifier__1,
  });
  const Sale = IDL.Record({
    'end': Time,
    'groups': IDL.Vec(SalePricingGroup),
    'start': Time,
    'quantity': IDL.Nat,
    'remaining': SaleRemaining,
  });
  const Result_5 = IDL.Variant({
    'ok': IDL.Tuple(AccountIdentifier__1, IDL.Nat64),
    'err': IDL.Text,
  });
  const SaleDetailGroup = IDL.Record({
    'id': IDL.Nat,
    'end': Time,
    'name': IDL.Text,
    'available': IDL.Bool,
    'pricing': IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    'start': Time,
  });
  const SaleDetails = IDL.Record({
    'end': Time,
    'groups': IDL.Vec(SaleDetailGroup),
    'start': Time,
    'quantity': IDL.Nat,
    'remaining': IDL.Nat,
  });
  const Result_4 = IDL.Variant({ 'ok': IDL.Null, 'err': IDL.Text });
  const SaleTransaction = IDL.Record({
    'time': Time,
    'seller': IDL.Principal,
    'tokens': IDL.Vec(TokenIndex),
    'buyer': AccountIdentifier__1,
    'price': IDL.Nat64,
  });
  const Memo = IDL.Vec(IDL.Nat8);
  const SubAccount = IDL.Vec(IDL.Nat8);
  const TransferRequest = IDL.Record({
    'to': User,
    'token': TokenIdentifier,
    'notify': IDL.Bool,
    'from': User,
    'memo': Memo,
    'subaccount': IDL.Opt(SubAccount),
    'amount': Balance,
  });
  const TransferResponse = IDL.Variant({
    'ok': Balance,
    'err': IDL.Variant({
      'CannotNotify': AccountIdentifier,
      'InsufficientBalance': IDL.Null,
      'InvalidToken': TokenIdentifier,
      'Rejected': IDL.Null,
      'Unauthorized': AccountIdentifier,
      'Other': IDL.Text,
    }),
  });
  const Balance__1 = IDL.Nat;
  const Result_2 = IDL.Variant({ 'ok': Balance__1, 'err': CommonError });
  const Time__1 = IDL.Int;
  const ActivationDetails = IDL.Record({
    'tokenID': TokenIndex,
    'owner': AccountIdentifier__1,
    'timestamp': Time__1,
  });
  const MetadataLegacy = IDL.Variant({
    'fungible': IDL.Record({
      'decimals': IDL.Nat8,
      'metadata': IDL.Opt(IDL.Vec(IDL.Nat8)),
      'name': IDL.Text,
      'symbol': IDL.Text,
    }),
    'nonfungible': IDL.Record({ 'metadata': IDL.Opt(IDL.Vec(IDL.Nat8)) }),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url': IDL.Text,
    'method': IDL.Text,
    'body': IDL.Vec(IDL.Nat8),
    'headers': IDL.Vec(HeaderField),
  });
  const HttpStreamingCallbackToken = IDL.Record({
    'key': IDL.Text,
    'sha256': IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index': IDL.Nat,
    'content_encoding': IDL.Text,
  });
  const HttpStreamingCallbackResponse = IDL.Record({
    'token': IDL.Opt(HttpStreamingCallbackToken),
    'body': IDL.Vec(IDL.Nat8),
  });
  const HttpStreamingStrategy = IDL.Variant({
    'Callback': IDL.Record({
      'token': HttpStreamingCallbackToken,
      'callback': IDL.Func(
        [HttpStreamingCallbackToken],
        [HttpStreamingCallbackResponse],
        ['query'],
      ),
    }),
  });
  const HttpResponse = IDL.Record({
    'body': IDL.Vec(IDL.Nat8),
    'headers': IDL.Vec(HeaderField),
    'upgrade': IDL.Bool,
    'streaming_strategy': IDL.Opt(HttpStreamingStrategy),
    'status_code': IDL.Nat16,
  });
  const Result_6 = IDL.Variant({ 'ok': MetadataLegacy, 'err': CommonError });
  const SaleSettings = IDL.Record({
    'startTime': Time,
    'whitelist': IDL.Bool,
    'totalToSell': IDL.Nat,
    'sold': IDL.Nat,
    'bulkPricing': IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    'whitelistTime': Time,
    'salePrice': IDL.Nat64,
    'remaining': IDL.Nat,
    'price': IDL.Nat64,
  });
  const Result_1 = IDL.Variant({
    'ok': IDL.Vec(TokenIndex),
    'err': CommonError,
  });
  const Result = IDL.Variant({
    'ok': IDL.Vec(
      IDL.Tuple(TokenIndex, IDL.Opt(Listing), IDL.Opt(IDL.Vec(IDL.Nat8)))
    ),
    'err': CommonError,
  });
  return IDL.Service({
    'acceptCycles': IDL.Func([], [], []),
    'addAsset': IDL.Func(
      [AssetHandle, IDL.Nat32, IDL.Text, IDL.Text, IDL.Text],
      [],
      [],
    ),
    'addThumbnail': IDL.Func([AssetHandle, IDL.Vec(IDL.Nat8)], [], []),
    'addTransactions': IDL.Func([IDL.Nat, TransactionDetail], [IDL.Text], []),
    'adminKillHeartbeat': IDL.Func([], [], []),
    'adminStartHeartbeat': IDL.Func([], [], []),
    'allSettlements': IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Tuple(
            TokenIndex,
            IDL.Record({
              'subaccount': SubAccount__1,
              'seller': IDL.Principal,
              'buyer': AccountIdentifier__1,
              'price': IDL.Nat64,
            }),
          )
        ),
      ],
      ['query'],
    ),
    'availableCycles': IDL.Func([], [IDL.Nat], ['query']),
    'balance': IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
    'bearer': IDL.Func([TokenIdentifier__1], [Result_7], ['query']),
    'details': IDL.Func([TokenIdentifier__1], [Result_10], ['query']),
    'ext_addAssetCanister': IDL.Func([], [], []),
    'ext_admin': IDL.Func([], [IDL.Principal], ['query']),
    'ext_assetAdd': IDL.Func(
      [AssetHandle, IDL.Text, IDL.Text, AssetType, IDL.Nat],
      [],
      [],
    ),
    'ext_assetExists': IDL.Func([AssetHandle], [IDL.Bool], ['query']),
    'ext_assetFits': IDL.Func([IDL.Bool, IDL.Nat], [IDL.Bool], ['query']),
    'ext_assetStream': IDL.Func(
      [AssetHandle, IDL.Vec(IDL.Nat8), IDL.Bool],
      [IDL.Bool],
      [],
    ),
    'ext_balance': IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
    'ext_bearer': IDL.Func([TokenIdentifier__1], [Result_7], ['query']),
    'ext_capInit': IDL.Func([], [], []),
    'ext_expired': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(AccountIdentifier__1, SubAccount__1))],
      ['query'],
    ),
    'ext_extensions': IDL.Func([], [IDL.Vec(Extension)], ['query']),
    'ext_marketplaceList': IDL.Func([ListRequest], [Result_3], []),
    'ext_marketplaceListings': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, Listing, Metadata))],
      ['query'],
    ),
    'ext_marketplacePurchase': IDL.Func(
      [TokenIdentifier__1, IDL.Nat64, AccountIdentifier__1],
      [Result_9],
      [],
    ),
    'ext_marketplaceSettle': IDL.Func([AccountIdentifier__1], [Result_3], []),
    'ext_marketplaceStats': IDL.Func(
      [],
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat, IDL.Nat, IDL.Nat],
      ['query'],
    ),
    'ext_marketplaceTransactions': IDL.Func(
      [],
      [IDL.Vec(Transaction)],
      ['query'],
    ),
    'ext_metadata': IDL.Func([TokenIdentifier__1], [Result_8], ['query']),
    'ext_mint': IDL.Func([AccountIdentifier__1], [IDL.Vec(TokenIndex)], []),
    'ext_payments': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(AccountIdentifier__1, Payment))],
      ['query'],
    ),
    'ext_removeAdmin': IDL.Func([], [], []),
    'ext_saleClose': IDL.Func([], [IDL.Bool], []),
    'ext_saleCurrent': IDL.Func([], [IDL.Opt(Sale)], ['query']),
    'ext_saleEnd': IDL.Func([], [IDL.Bool], []),
    'ext_saleOpen': IDL.Func(
      [
        IDL.Vec(SalePricingGroup),
        SaleRemaining,
        IDL.Vec(AccountIdentifier__1),
      ],
      [IDL.Bool],
      [],
    ),
    'ext_salePause': IDL.Func([], [IDL.Bool], []),
    'ext_salePurchase': IDL.Func(
      [IDL.Nat, IDL.Nat64, IDL.Nat64, AccountIdentifier__1],
      [Result_5],
      [],
    ),
    'ext_saleResume': IDL.Func([], [IDL.Bool], []),
    'ext_saleSettings': IDL.Func(
      [AccountIdentifier__1],
      [IDL.Opt(SaleDetails)],
      ['query'],
    ),
    'ext_saleSettle': IDL.Func([AccountIdentifier__1], [Result_4], []),
    'ext_saleTransactions': IDL.Func(
      [],
      [IDL.Vec(SaleTransaction)],
      ['query'],
    ),
    'ext_saleUpdate': IDL.Func(
      [
        IDL.Opt(IDL.Vec(SalePricingGroup)),
        IDL.Opt(SaleRemaining),
        IDL.Opt(IDL.Vec(AccountIdentifier__1)),
      ],
      [IDL.Bool],
      [],
    ),
    'ext_setAdmin': IDL.Func([IDL.Principal], [], []),
    'ext_setCollectionMetadata': IDL.Func([IDL.Text, IDL.Text], [], []),
    'ext_setMarketplaceOpen': IDL.Func([Time], [], []),
    'ext_setOwner': IDL.Func([IDL.Principal], [], []),
    'ext_setRoyalty': IDL.Func(
      [IDL.Vec(IDL.Tuple(AccountIdentifier__1, IDL.Nat64))],
      [],
      [],
    ),
    'ext_setSaleRoyalty': IDL.Func([AccountIdentifier__1], [], ['oneway']),
    'ext_transfer': IDL.Func([TransferRequest], [TransferResponse], []),
    'ext_updatemetadata': IDL.Func([Metadata], [Metadata], []),
    'extdata_supply': IDL.Func([TokenIdentifier__1], [Result_2], ['query']),
    'extensions': IDL.Func([], [IDL.Vec(Extension)], ['query']),
    'failedSales': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(AccountIdentifier__1, SubAccount__1))],
      ['query'],
    ),
    'getActivationTime': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(AccountIdentifier__1, ActivationDetails))],
      ['query'],
    ),
    'getHolders': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(AccountIdentifier__1, IDL.Vec(TokenIndex)))],
      ['query'],
    ),
    'getMetadata': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, MetadataLegacy))],
      ['query'],
    ),
    'getMinter': IDL.Func([], [IDL.Principal], ['query']),
    'getRegistry': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
      ['query'],
    ),
    'getRune': IDL.Func([], [IDL.Text], []),
    'getTokenId': IDL.Func([IDL.Nat32], [IDL.Text], ['query']),
    'getTokenURL': IDL.Func([IDL.Nat32], [IDL.Text], ['query']),
    'getTokens': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, MetadataLegacy))],
      ['query'],
    ),
    'getTransactions': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(TransactionDetail)))],
      ['query'],
    ),
    'heartbeat_assetCanisters': IDL.Func([], [], []),
    'heartbeat_capEvents': IDL.Func([], [], []),
    'heartbeat_disbursements': IDL.Func([], [], []),
    'heartbeat_external': IDL.Func([], [], []),
    'heartbeat_isRunning': IDL.Func([], [IDL.Bool], ['query']),
    'heartbeat_paymentSettlements': IDL.Func([], [], []),
    'heartbeat_pending': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
      ['query'],
    ),
    'heartbeat_start': IDL.Func([], [], []),
    'heartbeat_stop': IDL.Func([], [], []),
    'http_request': IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'http_request_streaming_callback': IDL.Func(
      [HttpStreamingCallbackToken],
      [HttpStreamingCallbackResponse],
      ['query'],
    ),
    'http_request_update': IDL.Func([HttpRequest], [HttpResponse], []),
    'isHeartbeatRunning': IDL.Func([], [IDL.Bool], ['query']),
    'list': IDL.Func([ListRequest], [Result_3], []),
    'listings': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, Listing, MetadataLegacy))],
      ['query'],
    ),
    'lock': IDL.Func(
      [TokenIdentifier__1, IDL.Nat64, AccountIdentifier__1, SubAccount__1],
      [Result_7],
      [],
    ),
    'metadata': IDL.Func([TokenIdentifier__1], [Result_6], ['query']),
    'reserve': IDL.Func(
      [IDL.Nat64, IDL.Nat64, AccountIdentifier__1, SubAccount__1],
      [Result_5],
      [],
    ),
    'retreive': IDL.Func([AccountIdentifier__1], [Result_4], []),
    'saleTransactions': IDL.Func([], [IDL.Vec(SaleTransaction)], ['query']),
    'salesSettings': IDL.Func(
      [AccountIdentifier__1],
      [SaleSettings],
      ['query'],
    ),
    'setFreeSupply': IDL.Func([IDL.Nat, Balance__1], [IDL.Bool], []),
    'setHTML': IDL.Func([IDL.Text, IDL.Nat], [], []),
    'setMinter': IDL.Func([IDL.Principal], [], []),
    'setSupply': IDL.Func([IDL.Nat, Balance__1], [IDL.Bool], []),
    'settle': IDL.Func([TokenIdentifier__1], [Result_3], []),
    'settlements': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1, IDL.Nat64))],
      ['query'],
    ),
    'stats': IDL.Func(
      [],
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat, IDL.Nat, IDL.Nat],
      ['query'],
    ),
    'supply': IDL.Func([TokenIdentifier__1], [Result_2], ['query']),
    'testToken': IDL.Func([TokenIndex], [IDL.Text], []),
    'tokens': IDL.Func([AccountIdentifier__1], [Result_1], ['query']),
    'tokens_ext': IDL.Func([AccountIdentifier__1], [Result], ['query']),
    'transactions': IDL.Func([], [IDL.Vec(Transaction)], ['query']),
    'transfer': IDL.Func([TransferRequest], [TransferResponse], []),
  });
}

export {
  bunnyCanisterId,
  carrotCanisterId,
  incubatorCanisterId,
  tokensFactory,
  bunnyFactory,
  carrotFactory,
  incubatorFactory,
  storage_array,
  daoFactory,
  daoCanisterId
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