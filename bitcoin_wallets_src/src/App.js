import { useWallets } from "@wallet-standard/react";
import { AddressPurpose, BitcoinNetworkType, getAddress } from "sats-connect";
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bitcoin from "./assets/images/Bitcoin.png";
import icpBunnyLogo from "./assets/images/logo.png";
import magiceden from "./assets/images/magiceden.jpg";
import unisat from "./assets/images/unisatLogo.png";
import xverse from "./assets/images/xverse_logo_whitebg.png";
import { bitcoinIdlFactory } from "./IDL/bitcoinCanister";
import { useState } from "react";
import { ThreeDots } from "react-loading-icons";

function App() {
  const { wallets } = useWallets();
  const [isLoading, setIsLoading] = useState([false, false, false]);

  const MAGICEDEN = "magiceden";
  const XVERSE = "xverse";
  const UNISAT = "unisat";
  const SatsConnectNamespace = "sats-connect:";

  const BitcoinWallets = [
    { wallet: MAGICEDEN, img: magiceden },
    { wallet: XVERSE, img: xverse },
    { wallet: UNISAT, img: unisat }
  ];

  const isSatsConnectCompatibleWallet = (wallet) => {
    return SatsConnectNamespace in wallet.features;
  }

  const host = "https://mainnet.dfinity.network";
  const bitcoinCanisterId = process.env.REACT_APP_BITCOIN_CANISTER_ID

  const connectWallet = async (wallet) => {
    let address = "";
    let actor = undefined;

    if (wallet === MAGICEDEN) {
      setIsLoading([true, false, false]);
    } else if (wallet === XVERSE) {
      setIsLoading([false, true, false]);
    } else {
      setIsLoading([false, false, true]);
    }

    try {
      await window.ic.plug.requestConnect({
        whitelist: [bitcoinCanisterId],
        host,
        onConnectionUpdate: () => { },
        timeout: 50000,
      });
      actor = await window.ic?.plug.createActor({
        canisterId: bitcoinCanisterId,
        interfaceFactory: bitcoinIdlFactory,
      });
    } catch (error) {
      setIsLoading([false, false, false]);
    }

    if (actor) {
      if (wallet === MAGICEDEN) {
        const provider = wallets.find(isSatsConnectCompatibleWallet);
        await getAddress({
          getProvider: async () =>
            provider.features[SatsConnectNamespace]?.provider,
          payload: {
            purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
            message: "Address for receiving Ordinals and payments",
            network: {
              type: BitcoinNetworkType.Mainnet,
            },
          },
          onFinish: (response) => {
            const { addresses } = response;
            const ordinals = addresses.find(
              (ele) => ele.purpose === AddressPurpose.Ordinals
            );
            address = ordinals.address;
          },
          onCancel: () => {
            setIsLoading([false, false, false]);
          },
        });
      } else if (wallet === XVERSE) {
        const getAddressOptions = {
          payload: {
            purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
            message: "Address for receiving Ordinals and payments",
            network: {
              type: BitcoinNetworkType.Mainnet,
            },
          },
          onFinish: (response) => {
            const { addresses } = response;
            const ordinals = addresses.find(
              (ele) => ele.purpose === AddressPurpose.Ordinals
            );
            address = ordinals.address;
          },
          onCancel: () => {
            setIsLoading([false, false, false]);
          },
        };
        try {
          await getAddress(getAddressOptions);
        } catch (error) {
          toast(error.message, { theme: "dark", type: "error" });
        }
      } else {
        if (typeof window.unisat !== "undefined") {
          try {
            var accounts = await window.unisat.requestAccounts();
            address = accounts[0];
          } catch (error) {
            toast(error.message);
          }
        } else {
          toast("No unisat wallet installed!", { theme: "dark", type: "info" });
          setIsLoading([false, false, false]);
        }
      }
      // Storing stuff
      if (address) {
        await actor.addBitcoinWallet(address);
        toast("Address stored successfully!", { theme: "dark", type: "success" });
        setIsLoading([false, false, false]);
      }
    } else {
      toast("Make sure plug wallet connected!", { theme: "dark", type: "warning" });
      setIsLoading([false, false, false]);
    }
  }

  return (
    <div className="App">
      <header className="App-header" style={{ position: "relative" }}>
        <img src={icpBunnyLogo} style={{ position: "absolute", left: "2%", top: "2%" }} width={175} alt="bitcoin" />
        <img src={bitcoin} className="bitcoin-logo" alt="bitcoin" />
        <p>Connect Bitcoin Wallet</p>
        {BitcoinWallets.map(({ wallet, img }, index) => (
          <button className="button" key={`${wallet}-${index}`} onClick={() => connectWallet(wallet)}>
            <div>
              {isLoading[index] ?
                <ThreeDots width={50} style={{ marginLeft: "60px" }} />
                :
                <>
                  <img alt={wallet} src={img} width={wallet === MAGICEDEN ? "50px" : "35px"} />
                  {wallet.toUpperCase()}
                </>
              }
            </div>
          </button>
        ))}
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
