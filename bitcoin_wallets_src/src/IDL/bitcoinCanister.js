export const bitcoinIdlFactory = ({ IDL }) => {
    const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
    const HttpRequest = IDL.Record({
        'url': IDL.Text,
        'method': IDL.Text,
        'body': IDL.Vec(IDL.Nat8),
        'headers': IDL.Vec(HeaderField),
    });
    const StreamingCallbackToken = IDL.Record({
        'key': IDL.Text,
        'sha256': IDL.Opt(IDL.Vec(IDL.Nat8)),
        'index': IDL.Nat,
        'content_encoding': IDL.Text,
    });
    const StreamingCallbackResponse = IDL.Record({
        'token': IDL.Opt(StreamingCallbackToken),
        'body': IDL.Vec(IDL.Nat8),
    });
    const StreamingStrategy = IDL.Variant({
        'Callback': IDL.Record({
            'token': StreamingCallbackToken,
            'callback': IDL.Func(
                [StreamingCallbackToken],
                [StreamingCallbackResponse],
                ['query'],
            ),
        }),
    });
    const HttpResponse = IDL.Record({
        'body': IDL.Vec(IDL.Nat8),
        'headers': IDL.Vec(HeaderField),
        'streaming_strategy': IDL.Opt(StreamingStrategy),
        'status_code': IDL.Nat16,
    });
    return IDL.Service({
        'acceptCycles': IDL.Func([], [], []),
        'addBitcoinWallet': IDL.Func([IDL.Text], [], []),
        'availableCycles': IDL.Func([], [IDL.Nat], ['query']),
        'getBitcoinWallets': IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text))],
            ['query'],
        ),
        'getDebug': IDL.Func([], [IDL.Text], ['query']),
        'get_cycles': IDL.Func([], [IDL.Nat], ['query']),
        'http_request': IDL.Func([HttpRequest], [HttpResponse], ['query']),
        'id': IDL.Func([], [IDL.Principal], []),
        'resetDebug': IDL.Func([], [IDL.Text], []),
        'set_owner': IDL.Func([IDL.Principal], [IDL.Bool], []),
        'wallet_receive': IDL.Func(
            [],
            [IDL.Record({ 'accepted': IDL.Nat64 })],
            [],
        ),
    });
};