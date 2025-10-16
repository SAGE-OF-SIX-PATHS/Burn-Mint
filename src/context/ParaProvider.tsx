import { ParaProvider as Provider } from "@getpara/react-sdk";
import { API_KEY, ENVIRONMENT } from "../config/constants";
import { sepolia, celo, mainnet, polygon } from "wagmi/chains";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
// import type ChainInfo from "@getpara/react-sdk";
import type { ChainInfo } from "../types/chainInfo";



// ✅ Full Cosmos chain definitions (proper ChainInfo objects)
const cosmoshub: ChainInfo = {
  chainId: "cosmoshub-4",
  chainName: "Cosmos Hub",
  rpc: "https://rpc.cosmoshub.strange.love",
  rest: "https://api.cosmoshub.strange.love",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmospub",
    bech32PrefixValAddr: "cosmosvaloper",
    bech32PrefixValPub: "cosmosvaloperpub",
    bech32PrefixConsAddr: "cosmosvalcons",
    bech32PrefixConsPub: "cosmosvalconspub",
  },
  currencies: [
    { coinDenom: "ATOM", coinMinimalDenom: "uatom", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "ATOM", coinMinimalDenom: "uatom", coinDecimals: 6 },
  ],
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
  },
  features: ["stargate", "ibc-transfer", "cosmwasm"],
};

const osmosis: ChainInfo = {
  chainId: "osmosis-1",
  chainName: "Osmosis",
  rpc: "https://rpc.osmosis.zone",
  rest: "https://lcd.osmosis.zone",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "osmo",
    bech32PrefixAccPub: "osmopub",
    bech32PrefixValAddr: "osmovaloper",
    bech32PrefixValPub: "osmovaloperpub",
    bech32PrefixConsAddr: "osmovalcons",
    bech32PrefixConsPub: "osmovalconspub",
  },
  currencies: [
    { coinDenom: "OSMO", coinMinimalDenom: "uosmo", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "OSMO", coinMinimalDenom: "uosmo", coinDecimals: 6 },
  ],
  stakeCurrency: {
    coinDenom: "OSMO",
    coinMinimalDenom: "uosmo",
    coinDecimals: 6,
  },
  features: ["stargate", "ibc-transfer", "cosmwasm"],
};

const noble: ChainInfo = {
  chainId: "noble-1",
  chainName: "Noble",
  rpc: "https://rpc.noble.strange.love",
  rest: "https://api.noble.strange.love",
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "noble",
    bech32PrefixAccPub: "noblepub",
    bech32PrefixValAddr: "noblevaloper",
    bech32PrefixValPub: "noblevaloperpub",
    bech32PrefixConsAddr: "noblevalcons",
    bech32PrefixConsPub: "noblevalconspub",
  },
  currencies: [
    { coinDenom: "USDC", coinMinimalDenom: "uusdc", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "USDC", coinMinimalDenom: "uusdc", coinDecimals: 6 },
  ],
  stakeCurrency: {
    coinDenom: "USDC",
    coinMinimalDenom: "uusdc",
    coinDecimals: 6,
  },
  features: ["stargate", "ibc-transfer"],
};

const cosmosChains = [cosmoshub, osmosis, noble];

const solanaNetwork = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(solanaNetwork);

export function ParaProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider
      paraClientConfig={{
        apiKey: API_KEY,
        env: ENVIRONMENT,
      }}
      externalWalletConfig={{
        wallets: [
          "METAMASK",
          "COINBASE",
          "WALLETCONNECT",
          "RAINBOW",
          "ZERION",
          "KEPLR",
          "LEAP",
          "RABBY",
          "GLOW",
          "PHANTOM",
          "BACKPACK",
          "SOLFLARE",
        ],
        createLinkedEmbeddedForExternalWallets: ["METAMASK", "PHANTOM", "KEPLR"],
        evmConnector: {
          config: {
            chains: [mainnet, polygon, sepolia, celo],
          },
        },
        cosmosConnector: {
          config: {
            chains: cosmosChains,
            selectedChainId: cosmoshub.chainId,
            multiChain: false,
            onSwitchChain: (chainId) => {
              console.warn("Switched chain to:", chainId);
            },
          },
        },
        solanaConnector: {
          config: {
            endpoint,
            chain: solanaNetwork,
            appIdentity: {
              uri:
                typeof window !== "undefined"
                  ? `${window.location.protocol}//${window.location.host}`
                  : "",
            },
          },
        },
        walletConnect: {
          projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "",
        },
      }}
      config={{ appName: "Para Modal + Multichain Wallets SAGE OF SIX PATHS" }}
      paraModalConfig={{
        disableEmailLogin: false,
        disablePhoneLogin: false,
        authLayout: ["AUTH:FULL", "EXTERNAL:FULL"],
        oAuthMethods: [
          "APPLE",
          "DISCORD",
          "FACEBOOK",
          "FARCASTER",
          "GOOGLE",
          "TWITTER",
        ],
        onRampTestMode: true,
        logo: "/fluent.jpg",
        recoverySecretStepEnabled: true,
        twoFactorAuthEnabled: false,
      }}
    >
      {children}
    </Provider>
  );
}













// import { ParaProvider as Provider } from "@getpara/react-sdk";
// import { API_KEY, ENVIRONMENT } from "../config/constants";
// import { sepolia, celo, mainnet, polygon } from "wagmi/chains";
// import { cosmoshub, osmosis, noble } from "../config/cosmosChains";

// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";

// const cosmosChains = [cosmoshub, osmosis, noble];

// const solanaNetwork = WalletAdapterNetwork.Devnet;
// const endpoint = clusterApiUrl(solanaNetwork);

// export function ParaProvider({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <Provider
//       paraClientConfig={{
//         apiKey: API_KEY,
//         env: ENVIRONMENT,
//       }}
//       externalWalletConfig={{
//         wallets: [
//           "METAMASK",
//           "COINBASE",
//           "WALLETCONNECT",
//           "RAINBOW",
//           "ZERION",
//           "KEPLR",
//           "LEAP",
//           "RABBY",
//           "GLOW",
//           "PHANTOM",
//           "BACKPACK",
//           "SOLFLARE",
//         ],
//         createLinkedEmbeddedForExternalWallets: ["METAMASK", "PHANTOM", "KEPLR"],
//         evmConnector: {
//           config: {
//             chains: [mainnet, polygon, sepolia, celo],
//           },
//         },
//         cosmosConnector: {
//           config: {
//             chains: cosmosChains,
//             selectedChainId: cosmoshub.chainId,
//             multiChain: false,
//             onSwitchChain: (chainId) => {
//               console.warn("Switched chain to:", chainId);
//             },
//           },
//         },
//         solanaConnector: {
//           config: {
//             endpoint,
//             chain: solanaNetwork,
//             appIdentity: {
//               uri:
//                 typeof window !== "undefined"
//                   ? `${window.location.protocol}//${window.location.host}`
//                   : "",
//             },
//           },
//         },
//         walletConnect: {
//           projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "",
//         },
//       }}
//       config={{ appName: "Para Modal + Multichain Wallets Example" }}
//       paraModalConfig={{
//         disableEmailLogin: false,
//         disablePhoneLogin: false,
//         authLayout: ["AUTH:FULL", "EXTERNAL:FULL"],
//         oAuthMethods: [
//           "APPLE",
//           "DISCORD",
//           "FACEBOOK",
//           "FARCASTER",
//           "GOOGLE",
//           "TWITTER",
//         ],
//         onRampTestMode: true,
//         // theme: {
//         //   foregroundColor: "#2D3142",
//         //   backgroundColor: "#F7F7F7",
//         //   accentColor: "#EF8354",
//         //   mode: "light",
//         //   borderRadius: "none",
//         //   font: "Inter",
//         // },
//         logo: "/para.svg",
//         recoverySecretStepEnabled: true,
//         twoFactorAuthEnabled: false,
//       }}
//     >
//       {children}
//     </Provider>
//   );
// }
