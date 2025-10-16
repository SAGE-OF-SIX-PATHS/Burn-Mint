Here’s a **clean, professional, and well-structured** README with proper markdown styling, code highlighting, and emojis to make it clear and developer-friendly 👇

---

# 🚀 Guide to Setting Up Para Wallet on React + TypeScript

**First step to integrate Para Wallet in your frontend — without the hassle of reading the docs.**

This guide walks you through cloning, setting up, and running the [**Burn-Mint**](https://github.com/SAGE-OF-SIX-PATHS/Burn-Mint) project locally to get Para Wallet running in minutes.

---

## 🧭 1️⃣ Clone the Repository

```bash
git clone https://github.com/SAGE-OF-SIX-PATHS/Burn-Mint.git
cd Burn-Mint
```

---

## ⚙️ 2️⃣ Create Environment Variables

Create a `.env` file in the project root and add the following:

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

---

## 📦 3️⃣ Install Dependencies

Choose **your preferred package manager** below 👇

### 🟣 Using **pnpm**

```bash
pnpm add @getpara/react-sdk@alpha @tanstack/react-query @getpara/graz@alpha \
@cosmjs/cosmwasm-stargate @cosmjs/launchpad @cosmjs/proto-signing \
@cosmjs/stargate @cosmjs/tendermint-rpc @leapwallet/cosmos-social-login-capsule-provider \
long starknet wagmi viem \
@farcaster/mini-app-solana @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector \
@solana-mobile/wallet-adapter-mobile @solana/wallet-adapter-base \
@solana/wallet-adapter-react @solana/wallet-adapter-walletconnect @solana/web3.js --save-exact
```

---

### 🟢 Using **npm**

```bash
npm install @getpara/react-sdk@alpha @tanstack/react-query @getpara/graz@alpha \
@cosmjs/cosmwasm-stargate @cosmjs/launchpad @cosmjs/proto-signing \
@cosmjs/stargate @cosmjs/tendermint-rpc @leapwallet/cosmos-social-login-capsule-provider \
long starknet wagmi viem \
@farcaster/mini-app-solana @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector \
@solana-mobile/wallet-adapter-mobile @solana/wallet-adapter-base \
@solana/wallet-adapter-react @solana/wallet-adapter-walletconnect @solana/web3.js --save-exact
```

---

### 🔵 Using **yarn**

```bash
yarn add @getpara/react-sdk@alpha @tanstack/react-query @getpara/graz@alpha \
@cosmjs/cosmwasm-stargate @cosmjs/launchpad @cosmjs/proto-signing \
@cosmjs/stargate @cosmjs/tendermint-rpc @leapwallet/cosmos-social-login-capsule-provider \
long starknet wagmi viem \
@farcaster/mini-app-solana @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector \
@solana-mobile/wallet-adapter-mobile @solana/wallet-adapter-base \
@solana/wallet-adapter-react @solana/wallet-adapter-walletconnect @solana/web3.js --exact
```

---

## 🧑‍💻 4️⃣ Run the App

### With **pnpm**

```bash
pnpm run dev
```

### With **npm**

```bash
npm run dev
```

### With **yarn**

```bash
yarn dev
```

---

## 🌐 5️⃣ Open in Browser

Visit:

```
http://localhost:5173
```

---

## 💼 6️⃣ Interact with the App

| Action                | Description                         |
| --------------------- | ----------------------------------- |
| 🔗 **Connect Wallet** | Click the **Connect Wallet** button |
| ✍️ **Sign Message**   | Click the **Sign Message** button   |
| 🔥 **Burn fUSD**      | Click the **Burn fUSD** button      |
| 💰 **Mint fUSD**      | Click the **Mint fUSD** button      |

---

## 🧠 Notes

* Ensure your **Para API key** and **WalletConnect Project ID** are correct.
* Use **Fluent Testnet RPC** for testing.
* If you get dependency issues, delete `node_modules` and lockfiles, then reinstall.

---

## 🪙 What You’ll Get

Once setup is complete:

* A React + TypeScript app connected to **Para Wallet**
* Wallet connection and message signing
* fUSD token burning and minting functionality
* Full support for Cosmos & Solana wallets

---

## 🧾 License

This project is open-sourced under the [MIT License](./LICENSE).

---

Would you like me to make this **GitHub-optimized** (with emojis, collapsible code sections, and shields/badges at the top for repo aesthetics)?
That would make it look like a polished open-source project README.
