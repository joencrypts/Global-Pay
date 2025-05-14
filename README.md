# GlobePay

> **Pitch:**
> GlobePay is a next-generation stablecoin wallet and budgeting dApp for the Base L2 network. It empowers users to manage, spend, and analyze their stablecoin finances globally, with real-time insights and smart budgeting tools. 
>
> **Problem:** Managing stablecoins across networks is complex, and most wallets lack budgeting, analytics, and actionable insights. GlobePay solves this by combining a beautiful dashboard, live analytics, and seamless Base L2 integration.
>

---

## Features

- 🌐 **Base L2 Integration**: Connect to Base Mainnet & Goerli Testnet with one click.
- 💳 **Multi-Stablecoin Dashboard**: View balances for USDC, EUROC, DAI, and more.
- 📈 **Real-Time Price Feeds**: Live USD conversion using Chainlink oracles.
- 🧠 **Smart Budgeting Assistant**: Auto-categorizes transactions and visualizes spending.
- ⚡ **Quick Actions**: Send, receive, swap, and buy stablecoins instantly.
- 🧩 **Modern UI/UX**: Responsive, Tailwind-powered dashboard with cards and charts.

---

## Getting Started

### 1. **Clone & Install**
```bash
# Clone the repo
 git clone https://github.com/joencrypts/Globe-Pay.git
 cd Globe-Pay

# Install dependencies
 npm install

# Install frontend dependencies
 cd frontend
 npm install
```

### 2. **Configure Environment**
Create a `.env` file in the root for contract deployment (see `hardhat.config.ts`). Example:
```
BASE_GOERLI_RPC_URL=your_base_goerli_rpc_url
BASE_MAINNET_RPC_URL=your_base_mainnet_rpc_url
PRIVATE_KEY=your_private_key
```

### 3. **Run the App**
```bash
# In the frontend directory
npm start
```

---

## Base Network Integration

- **MetaMask Network Config:**
  - **Base Mainnet**
    ```json
    {
      "chainId": "0x2105",
      "chainName": "Base Mainnet",
      "rpcUrls": ["https://mainnet.base.org"],
      "blockExplorerUrls": ["https://basescan.org"],
      "nativeCurrency": { "name": "Ether", "symbol": "ETH", "decimals": 18 }
    }
    ```
  - **Base Goerli (Testnet)**
    ```json
    {
      "chainId": "0x14a33",
      "chainName": "Base Goerli",
      "rpcUrls": ["https://goerli.base.org"],
      "blockExplorerUrls": ["https://goerli.basescan.org"],
      "nativeCurrency": { "name": "Ether", "symbol": "ETH", "decimals": 18 }
    }
    ```
- **Ethers.js Provider Example:**
  ```ts
  import { JsonRpcProvider } from "ethers";
  const baseProvider = new JsonRpcProvider("https://mainnet.base.org");
  ```

---

## Project Structure

```
GlobePay/
  contracts/         # Solidity smart contracts (Hardhat)
  frontend/          # React + Tailwind frontend
    src/components/  # UI components (dashboard, wallet, budgeting, etc.)
    src/hooks/       # Custom React hooks (balances, price feeds, budgeting)
  ignition/          # Hardhat deployment modules
  test/              # Contract tests
  hardhat.config.ts  # Hardhat config (Base L2 ready)
  README.md          # This file
```

---

## License

[MIT]

