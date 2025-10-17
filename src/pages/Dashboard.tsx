// src/pages/Dashboard.tsx
import React, { useMemo } from "react";
import {
  useWallet,
  useAccount,
  useClient,
  useWalletBalance,
  type Wallet as ParaWallet,
} from "@getpara/react-sdk";
import type { WalletListProps } from "../types/chainInfo";

/**
 * Dashboard Page
 * -------------------------------------
 * Displays the user's current wallet, all linked wallets,
 * and filtered wallets by type (EVM / COSMOS / SOLANA),
 * with balances for both embedded and external wallets.
 */
export default function Dashboard() {
  // ✅ Get currently active wallet
  const { data: currentWallet } = useWallet();

  // ✅ Get full account object (metadata, ID, etc.)
  const account = useAccount();

  // ✅ Access the Para client instance
  const para = useClient();

  /**
   * ✅ Fetch wallet lists by type from Para
   */
  const evmWallets = useMemo<Partial<ParaWallet>[]>(
    () => para?.getWalletsByType("EVM") ?? [],
    [para]
  );

  const cosmosWallets = useMemo<Partial<ParaWallet>[]>(
    () => para?.getWalletsByType("COSMOS") ?? [],
    [para]
  );

  const solanaWallets = useMemo<Partial<ParaWallet>[]>(
    () => para?.getWalletsByType("SOLANA") ?? [],
    [para]
  );

  /**
   * ✅ Group embedded and external wallets
   */
  const allEmbeddedWallets = useMemo(
    () => [
      ...evmWallets.filter((w) => !w.isExternal),
      ...cosmosWallets.filter((w) => !w.isExternal),
      ...solanaWallets.filter((w) => !w.isExternal),
    ],
    [evmWallets, cosmosWallets, solanaWallets]
  );

  const allExternalWallets = useMemo(
    () => [
      ...evmWallets.filter((w) => w.isExternal),
      ...cosmosWallets.filter((w) => w.isExternal),
      ...solanaWallets.filter((w) => w.isExternal),
    ],
    [evmWallets, cosmosWallets, solanaWallets]
  );

  // ✅ Handle case: No wallet connected
  if (!currentWallet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <p className="text-xl font-semibold mb-3">No wallet connected</p>
        <p className="text-sm text-gray-500">
          Please connect your wallet using Para Modal.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Wallet Dashboard
        </h1>

        {/* ✅ Current Wallet */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Current Wallet
          </h2>
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-800 font-mono break-all">
              <strong>Address:</strong> {currentWallet.address ?? "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Type:</strong> {currentWallet.scheme}
            </p>
            <p className="text-gray-600">
              <strong>ID:</strong> {currentWallet.id}
            </p>
            <p className="text-gray-600">
              <strong>External:</strong>{" "}
              {currentWallet.isExternal ? "Yes" : "No"}
            </p>
            <WalletBalanceDisplay walletId={currentWallet.id} />
          </div>
        </section>

        {/* ✅ Embedded Wallets */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Embedded Wallets
          </h2>
          {allEmbeddedWallets.length === 0 ? (
            <p className="text-gray-500 text-sm">No embedded wallets found.</p>
          ) : (
            allEmbeddedWallets.map((wallet) => (
              <WalletCard key={wallet.id} wallet={wallet} />
            ))
          )}
        </section>

        {/* ✅ External Wallets */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            External Wallets
          </h2>
          {allExternalWallets.length === 0 ? (
            <p className="text-gray-500 text-sm">No external wallets linked.</p>
          ) : (
            allExternalWallets.map((wallet) => (
              <WalletCard key={wallet.id} wallet={wallet} />
            ))
          )}
        </section>

        {/* ✅ Wallets by Type */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Wallets by Blockchain Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WalletList title="EVM Wallets" wallets={evmWallets} />
            <WalletList title="Cosmos Wallets" wallets={cosmosWallets} />
            <WalletList title="Solana Wallets" wallets={solanaWallets} />
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * 🪙 WalletBalanceDisplay Component
 */
function WalletBalanceDisplay({ walletId }: { walletId: string }) {
  const { data: balance, isLoading, error } = useWalletBalance({ walletId });

  if (isLoading)
    return <p className="text-gray-500 text-sm mt-1">Fetching balance...</p>;
  if (error)
    return <p className="text-red-500 text-sm mt-1">Error loading balance</p>;
  if (!balance)
    return <p className="text-gray-500 text-sm mt-1">No balance data</p>;

  const formattedBalance = (Number(balance) / 1e18).toFixed(4);

  return (
    <p className="text-gray-800 text-sm mt-1">
      <strong>Balance:</strong> {formattedBalance} ETH
    </p>
  );
}

/**
 * 🧱 WalletList Component
 */
function WalletList({ title, wallets }: WalletListProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
      <h3 className="text-md font-semibold text-gray-800 mb-2">{title}</h3>
      {wallets.length === 0 ? (
        <p className="text-gray-500 text-sm">No wallets found</p>
      ) : (
        <ul className="space-y-2">
          {wallets.map((wallet) => (
            <li
              key={wallet.id}
              className="bg-white border border-gray-200 rounded-md p-2 shadow-sm"
            >
              <p className="font-mono text-xs text-gray-800 break-all">
                {wallet.address ?? "N/A"}
              </p>
              <p className="text-gray-600 text-xs">{wallet.scheme}</p>
              {wallet.id && <WalletBalanceDisplay walletId={wallet.id} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * 🧱 WalletCard Component
 */
function WalletCard({ wallet }: { wallet: Partial<ParaWallet> }) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 mb-2">
      <p className="font-mono text-xs text-gray-800 break-all">
        {wallet.address ?? "N/A"}
      </p>
      <p className="text-gray-600 text-xs">{wallet.scheme}</p>
      {wallet.id && <WalletBalanceDisplay walletId={wallet.id} />}
    </div>
  );
}




































// // src/pages/Dashboard.tsx
// import React, { useMemo } from "react";
// import {
//   useWallet,
//   useAccount,
//   useClient,
//   useWalletBalance,
//   type Wallet as ParaWallet,
// } from "@getpara/react-sdk";
// import type { WalletListProps } from '../types/chainInfo'

// /**
//  * Dashboard Page
//  * -------------------------------------
//  * Displays the user's current wallet, all linked wallets,
//  * and filtered wallets by type (EVM / COSMOS / SOLANA),
//  * with balances for both embedded and external wallets.
//  */
// export default function Dashboard() {
//   // ✅ Get currently active wallet
//   const { data: currentWallet } = useWallet();

//   // ✅ Get full account object (metadata, ID, etc.)
//   const account = useAccount();

//   // ✅ Access the Para client instance
//   const para = useClient();

//   /**
//    * ✅ Fetch wallet lists by type from Para
//    */
//   const evmWallets = useMemo<Partial<ParaWallet>[]>(
//     () => para?.getWalletsByType("EVM") ?? [],
//     [para]
//   );

//   const cosmosWallets = useMemo<Partial<ParaWallet>[]>(
//     () => para?.getWalletsByType("COSMOS") ?? [],
//     [para]
//   );

//   const solanaWallets = useMemo<Partial<ParaWallet>[]>(
//     () => para?.getWalletsByType("SOLANA") ?? [],
//     [para]
//   );

//   /**
//    * ✅ Group embedded and external wallets
//    */
//   const allEmbeddedWallets = useMemo(
//     () => [
//       ...evmWallets.filter((w) => !w.isExternal),
//       ...cosmosWallets.filter((w) => !w.isExternal),
//       ...solanaWallets.filter((w) => !w.isExternal),
//     ],
//     [evmWallets, cosmosWallets, solanaWallets]
//   );

//   const allExternalWallets = useMemo(
//     () => [
//       ...evmWallets.filter((w) => w.isExternal),
//       ...cosmosWallets.filter((w) => w.isExternal),
//       ...solanaWallets.filter((w) => w.isExternal),
//     ],
//     [evmWallets, cosmosWallets, solanaWallets]
//   );

//   // ✅ Handle case: No wallet connected
//   if (!currentWallet) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
//         <p className="text-xl font-semibold mb-3">No wallet connected</p>
//         <p className="text-sm text-gray-500">
//           Please connect your wallet using Para Modal.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border border-gray-200 p-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Wallet Dashboard
//         </h1>

//         {/* ✅ Current Wallet */}
//         <section className="mb-10">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             Current Wallet
//           </h2>
//           <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
//             <p className="text-gray-800 font-mono break-all">
//               <strong>Address:</strong> {currentWallet.address ?? "N/A"}
//             </p>
//             <p className="text-gray-600">
//               <strong>Type:</strong> {currentWallet.scheme}
//             </p>
//             <p className="text-gray-600">
//               <strong>ID:</strong> {currentWallet.id}
//             </p>
//             <p className="text-gray-600">
//               <strong>External:</strong>{" "}
//               {currentWallet.isExternal ? "Yes" : "No"}
//             </p>
//             {/* ✅ Show balance for current wallet */}
//             <WalletBalanceDisplay walletId={currentWallet.id} />
//           </div>
//         </section>

//         {/* ✅ Embedded Wallets */}
//         <section className="mb-10">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             Embedded Wallets
//           </h2>
//           {allEmbeddedWallets.length === 0 ? (
//             <p className="text-gray-500 text-sm">No embedded wallets found.</p>
//           ) : (
//             allEmbeddedWallets.map((wallet) => (
//               <WalletCard key={wallet.id} wallet={wallet} />
//             ))
//           )}
//         </section>

//         {/* ✅ External Wallets */}
//         <section className="mb-10">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             External Wallets
//           </h2>
//           {allExternalWallets.length === 0 ? (
//             <p className="text-gray-500 text-sm">No external wallets linked.</p>
//           ) : (
//             allExternalWallets.map((wallet) => (
//               <WalletCard key={wallet.id} wallet={wallet} />
//             ))
//           )}
//         </section>

//         {/* ✅ Wallets by Type */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             Wallets by Blockchain Type
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <WalletList title="EVM Wallets" wallets={evmWallets} />
//             <WalletList title="Cosmos Wallets" wallets={cosmosWallets} />
//             <WalletList title="Solana Wallets" wallets={solanaWallets} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// /**
//  * 🪙 WalletBalanceDisplay Component
//  * Uses Para SDK's useWalletBalance hook to show balance for a wallet.
//  */
// function WalletBalanceDisplay({ walletId }: { walletId: string }) {
//   const { data: balance, isLoading, error } = useWalletBalance({ walletId });

//   if (isLoading)
//     return <p className="text-gray-500 text-sm mt-1">Fetching balance...</p>;
//   if (error)
//     return <p className="text-red-500 text-sm mt-1">Error loading balance</p>;
//   if (!balance)
//     return <p className="text-gray-500 text-sm mt-1">No balance data</p>;

//   const formattedBalance = (Number(balance) / 1e18).toFixed(4);

//   return (
//     <p className="text-gray-800 text-sm mt-1">
//       <strong>Balance:</strong> {formattedBalance} ETH
//     </p>
//   );
// }

// /**
//  * 🧱 WalletList Component
//  */
// function WalletList({ title, wallets }: WalletListProps) {
//   return (
//     <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
//       <h3 className="text-md font-semibold text-gray-800 mb-2">{title}</h3>
//       {wallets.length === 0 ? (
//         <p className="text-gray-500 text-sm">No wallets found</p>
//       ) : (
//         <ul className="space-y-2">
//           {wallets.map((wallet) => (
//             <li
//               key={wallet.id}
//               className="bg-white border border-gray-200 rounded-md p-2 shadow-sm"
//             >
//               <p className="font-mono text-xs text-gray-800 break-all">
//                 {wallet.address ?? "N/A"}
//               </p>
//               <p className="text-gray-600 text-xs">{wallet.scheme}</p>
//               <WalletBalanceDisplay walletId={wallet.id!} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// /**
//  * 🧱 WalletCard Component
//  * Reusable card for embedded/external wallets
//  */
// function WalletCard({ wallet }: { wallet: Partial<ParaWallet> }) {
//   return (
//     <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 mb-2">
//       <p className="font-mono text-xs text-gray-800 break-all">
//         {wallet.address ?? "N/A"}
//       </p>
//       <p className="text-gray-600 text-xs">{wallet.scheme}</p>
//       {wallet.id && <WalletBalanceDisplay walletId={wallet.id} />}
//     </div>
//   );
// }




































// Working
// // src/pages/Dashboard.tsx
// import React, { useMemo } from "react";
// import {
//   useWallet,
//   useAccount,
//   useClient,
//   type Wallet as ParaWallet,
// } from "@getpara/react-sdk";

// /**
//  * Dashboard Page
//  * -------------------------------------
//  * Displays the user's current wallet, all linked wallets,
//  * and filtered wallets by type (EVM / COSMOS / SOLANA)
//  * using official Para SDK hooks.
//  */
// export default function Dashboard() {
//   // ✅ Get currently active wallet
//   const { data: currentWallet } = useWallet();

//   // ✅ Get full account object (metadata, ID, etc.)
//   const account = useAccount();

//   // ✅ Access the Para client instance
//   const para = useClient();

//   /**
//    * ✅ Safely fetch wallet lists by type
//    * Each call returns an array of ParaWallet objects
//    */
//   const evmWallets = useMemo<Partial<ParaWallet>[]>(
//     () => para?.getWalletsByType("EVM") ?? [],
//     [para]
//   );

//   const cosmosWallets = useMemo<Partial<ParaWallet>[]>(
//     () => para?.getWalletsByType("COSMOS") ?? [],
//     [para]
//   );

//   const solanaWallets = useMemo<Partial<ParaWallet>[]>(
//     () => para?.getWalletsByType("SOLANA") ?? [],
//     [para]
//   );

//   /**
//    * ✅ Combine all embedded wallets
//    * Using all wallets retrieved from Para SDK
//    */
// const allEmbeddedWallets = useMemo(
//   () => [
//     ...evmWallets.filter((w) => !w.isExternal),
//     ...cosmosWallets.filter((w) => !w.isExternal),
//     ...solanaWallets.filter((w) => !w.isExternal),
//   ],
//   [evmWallets, cosmosWallets, solanaWallets]
// );


//   /**
//    * ✅ Extract all external wallets
//    */
// const allExternalWallets = useMemo(
//   () => [
//     ...evmWallets.filter((w) => w.isExternal),
//     ...cosmosWallets.filter((w) => w.isExternal),
//     ...solanaWallets.filter((w) => w.isExternal),
//   ],
//   [evmWallets, cosmosWallets, solanaWallets]
// );


//   // ✅ Handle no wallet connected
//   if (!currentWallet) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
//         <p className="text-xl font-semibold mb-3">No wallet connected</p>
//         <p className="text-sm text-gray-500">
//           Please connect your wallet using Para Modal.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border border-gray-200 p-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Wallet Dashboard
//         </h1>

//         {/* ✅ Current Wallet */}
//         <section className="mb-10">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             Current Wallet
//           </h2>
//           <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
//             <p className="text-gray-800 font-mono break-all">
//               <strong>Address:</strong> {currentWallet.address ?? "N/A"}
//             </p>
//             <p className="text-gray-600">
//               <strong>Type:</strong> {currentWallet.scheme}
//             </p>
//             <p className="text-gray-600">
//               <strong>ID:</strong> {currentWallet.id}
//             </p>
//             <p className="text-gray-600">
//               <strong>External:</strong>{" "}
//               {currentWallet.isExternal ? "Yes" : "No"}
//             </p>
//           </div>
//         </section>

//         {/* ✅ All Wallets */}
//         <section className="mb-10">
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             All Wallets
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {allEmbeddedWallets.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">
//                   Embedded Wallets
//                 </h3>
//                 {allEmbeddedWallets.map((wallet) => (
//                   <WalletCard key={wallet.id} wallet={wallet} />
//                 ))}
//               </div>
//             )}

//             {allExternalWallets.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">
//                   External Wallets
//                 </h3>
//                 {allExternalWallets.map((wallet) => (
//                   <WalletCard key={wallet.id} wallet={wallet} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ✅ Wallets by Type */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             Wallets by Blockchain Type
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <WalletList title="EVM Wallets" wallets={evmWallets} />
//             <WalletList title="Cosmos Wallets" wallets={cosmosWallets} />
//             <WalletList title="Solana Wallets" wallets={solanaWallets} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// /**
//  * 🧱 WalletList Component
//  * Displays a list of wallet cards (address + scheme)
//  */
// function WalletList({
//   title,
//   wallets,
// }: {
//   title: string;
//   wallets: Partial<ParaWallet>[];
// }) {
//   return (
//     <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
//       <h3 className="text-md font-semibold text-gray-800 mb-2">{title}</h3>
//       {wallets.length === 0 ? (
//         <p className="text-gray-500 text-sm">No wallets found</p>
//       ) : (
//         <ul className="space-y-2">
//           {wallets.map((wallet) => (
//             <li
//               key={wallet.id}
//               className="bg-white border border-gray-200 rounded-md p-2 shadow-sm"
//             >
//               <p className="font-mono text-xs text-gray-800 break-all">
//                 {wallet.address ?? "N/A"}
//               </p>
//               <p className="text-gray-600 text-xs">{wallet.scheme}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// /**
//  * 🧱 WalletCard Component
//  * Reusable card for embedded/external wallets
//  */
// function WalletCard({ wallet }: { wallet: Partial<ParaWallet> }) {
//   return (
//     <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 mb-2">
//       <p className="font-mono text-xs text-gray-800 break-all">
//         {wallet.address ?? "N/A"}
//       </p>
//       <p className="text-gray-600 text-xs">{wallet.scheme}</p>
//     </div>
//   );
// }