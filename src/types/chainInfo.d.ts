// src/types/types.ts

// -------------------------------
// 🌐 Chain Information Type
// -------------------------------
export interface ChainInfo {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }[];
  feeCurrencies: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }[];
  stakeCurrency: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  };
  features?: string[];
}

// -------------------------------
// 💳 Wallet & Account Types (Unified with Para SDK)
// -------------------------------
import type { Wallet, WalletScheme } from "@getpara/core-sdk";

/**
 * ✅ Directly use the Para SDK Wallet and WalletScheme types
 * to ensure perfect compatibility with para.getWalletsByType()
 */

export interface WalletListProps {
  title: string;
  wallets: Partial<Wallet>[]; // using Partial<Wallet> for safety
}


























// // src/types/types.ts

// // -------------------------------
// // 🌐 Chain Information Type
// // -------------------------------
// export interface ChainInfo {
//   chainId: string;
//   chainName: string;
//   rpc: string;
//   rest: string;
//   bip44: {
//     coinType: number;
//   };
//   bech32Config: {
//     bech32PrefixAccAddr: string;
//     bech32PrefixAccPub: string;
//     bech32PrefixValAddr: string;
//     bech32PrefixValPub: string;
//     bech32PrefixConsAddr: string;
//     bech32PrefixConsPub: string;
//   };
//   currencies: {
//     coinDenom: string;
//     coinMinimalDenom: string;
//     coinDecimals: number;
//   }[];
//   feeCurrencies: {
//     coinDenom: string;
//     coinMinimalDenom: string;
//     coinDecimals: number;
//   }[];
//   stakeCurrency: {
//     coinDenom: string;
//     coinMinimalDenom: string;
//     coinDecimals: number;
//   };
//   features?: string[];
// }

// // -------------------------------
// // 💳 Wallet & Account Types (Para SDK aligned)
// // -------------------------------
// export type WalletScheme = "EVM" | "COSMOS" | "SOLANA";

// export interface Wallet {
//   id: string;
//   address?: string; // Optional to match SDK
//   publicKey?: string;
//   scheme: WalletScheme;
//   isExternal: boolean;
//   name?: string;
// }

// // Updated to allow arrays or undefined (not Record)
// export interface EmbeddedAccount {
//   wallets?: Wallet[];
// }

// export interface ExternalAccount {
//   wallets?: Wallet[];
// }

// export interface Account {
//   embedded?: EmbeddedAccount;
//   external?: ExternalAccount;
// }

// // -------------------------------
// // 🧱 WalletList Props (used in Dashboard.tsx)
// // -------------------------------
// export interface WalletListProps {
//   title: string;
//   wallets: Partial<Wallet>[];
// }

// // -------------------------------
// // ✅ End of WalletList type section
// // -------------------------------







