<h1 align="center">Guide to Setting Up Para Wallet on React + TypeScript</h1>
---
> **Your first step to integrating Para Wallet into your frontend — without reading pages of docs.**
> Follow this guide to quickly clone, configure, and run the [**Burn-Mint**](https://github.com/SAGE-OF-SIX-PATHS/Burn-Mint) project locally.

---

## 🏗️ **Project Overview**

This guide helps you integrate the **Para Wallet SDK** with your **React + TypeScript** app for seamless blockchain interactions — including wallet connection, message signing, and fUSD mint/burn operations.

---

## 🧭 **1️⃣ Clone the Repository**

```bash
git clone https://github.com/SAGE-OF-SIX-PATHS/Burn-Mint.git
cd Burn-Mint
```

---

## ⚙️ **2️⃣ Set Up Environment Variables**

Create a `.env` file in your project root and add the following variables 👇

```bash
VITE_PARA_API_KEY=<your_para_api_key>
VITE_WALLET_CONNECT_PROJECT_ID=<your_walletconnect_project_id>

# Fluent Testnet RPC
VITE_FLUENT_RPC=<rpc_url>

# fUSD token contract
VITE_FUSD_ADDRESS=<fusd_contract_address>

# DeskController contract
VITE_DESK_CONTROLLER=<desk_controller_address>

# Oracle contract
VITE_ORACLE=<oracle_contract_address>
```

💡 **Tip:** Make sure to never commit your `.env` file to GitHub.

---

## 📦 **3️⃣ Install Dependencies**

You can use **pnpm**, **npm**, or **yarn** — choose your preferred manager below 👇

<details>
<summary>🟣 <strong>pnpm</strong></summary>

```bash
pnpm add @getpara/react-sdk@alpha @tanstack/react-query @getpara/graz@alpha \
@cosmjs/cosmwasm-stargate @cosmjs/launchpad @cosmjs/proto-signing \
@cosmjs/stargate @cosmjs/tendermint-rpc @leapwallet/cosmos-social-login-capsule-provider \
long starknet wagmi viem \
@farcaster/mini-app-solana @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector \
@solana-mobile/wallet-adapter-mobile @solana/wallet-adapter-base \
@solana/wallet-adapter-react @solana/wallet-adapter-walletconnect @solana/web3.js --save-exact
```

</details>

<details>
<summary>🟢 <strong>npm</strong></summary>

```bash
npm install @getpara/react-sdk@alpha @tanstack/react-query @getpara/graz@alpha \
@cosmjs/cosmwasm-stargate @cosmjs/launchpad @cosmjs/proto-signing \
@cosmjs/stargate @cosmjs/tendermint-rpc @leapwallet/cosmos-social-login-capsule-provider \
long starknet wagmi viem \
@farcaster/mini-app-solana @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector \
@solana-mobile/wallet-adapter-mobile @solana/wallet-adapter-base \
@solana/wallet-adapter-react @solana/wallet-adapter-walletconnect @solana/web3.js --save-exact
```

</details>

<details>
<summary>🔵 <strong>yarn</strong></summary>

```bash
yarn add @getpara/react-sdk@alpha @tanstack/react-query @getpara/graz@alpha \
@cosmjs/cosmwasm-stargate @cosmjs/launchpad @cosmjs/proto-signing \
@cosmjs/stargate @cosmjs/tendermint-rpc @leapwallet/cosmos-social-login-capsule-provider \
long starknet wagmi viem \
@farcaster/mini-app-solana @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector \
@solana-mobile/wallet-adapter-mobile @solana/wallet-adapter-base \
@solana/wallet-adapter-react @solana/wallet-adapter-walletconnect @solana/web3.js --exact
```

</details>

---

## 🧑‍💻 **4️⃣ Run the App**

<details>
<summary>⚡ Using pnpm</summary>

```bash
pnpm run dev
```

</details>

<details>
<summary>⚡ Using npm</summary>

```bash
npm run dev
```

</details>

<details>
<summary>⚡ Using yarn</summary>

```bash
yarn dev
```

</details>

---

## 🌐 **5️⃣ Open in Browser**

Visit:

```
http://localhost:5173
```

---

## 💼 **6️⃣ Interact with the App**

| 🧩 **Action**         | 📝 **Description**                  |
| --------------------- | ----------------------------------- |
| 🔗 **Connect Wallet** | Click the **Connect Wallet** button |
| ✍️ **Sign Message**   | Click the **Sign Message** button   |
| 🔥 **Burn fUSD**      | Click the **Burn fUSD** button      |
| 💰 **Mint fUSD**      | Click the **Mint fUSD** button      |

---

## 🧠 **Notes & Troubleshooting**

✅ Ensure:

* `VITE_PARA_API_KEY` and `VITE_WALLET_CONNECT_PROJECT_ID` are **valid**
* You’re using **Fluent Testnet RPC** for testing
* If errors occur, delete `node_modules` + lockfiles (`pnpm-lock.yaml`, `package-lock.json`, etc.) and reinstall

---

## 🪙 **What You’ll Get**

Once setup is complete, you’ll have:

* 🔐 A **React + TypeScript** app with integrated **Para Wallet**
* 🔗 Multi-chain wallet connection (Cosmos, Solana, etc.)
* 🧾 Message signing, token burning, and minting
* 🧠 Seamless developer experience with **modern web3 tooling**

---

## 🧾 **License**

This project is licensed under the [**MIT License**](./LICENSE).

---

## 💫 **Badges (Optional)**

You can add these at the top of your README for better GitHub visibility:

```md
![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)
![Uses TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Para Wallet](https://img.shields.io/badge/Powered%20by-Para%20Wallet-00D395?logo=ethereum&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
```

---

Would you like me to:

1. Add **visual badges** and **collapsible screenshots** for “Connect Wallet / Mint / Burn” steps?
2. Or keep it as this clean text-only professional version for GitHub?
