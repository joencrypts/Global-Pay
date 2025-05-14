import React, { useState } from "react";
import { BrowserProvider } from "ethers";
import { useTokenBalances, TokenInfo } from "../hooks/useTokenBalances";
import { useChainlinkPrice } from "../hooks/useChainlinkPrice";

// Example token info for Base Goerli (replace with mainnet as needed)
const TOKENS: TokenInfo[] = [
  {
    address: "0xB2cB9dA1bA7bA6e6e7e6e7e6e7e6e7e6e7e6e7e6", // USDC (example)
    symbol: "USDC",
    name: "USD Coin",
  },
  {
    address: "0xA2cB9dA1bA7bA6e6e7e6e7e6e7e6e7e6e7e6e7e7", // EUROC (example)
    symbol: "EUROC",
    name: "Euro Coin",
  },
  {
    address: "0xC2cB9dA1bA7bA6e6e7e6e7e6e7e6e7e6e7e6e7e8", // DAI (example)
    symbol: "DAI",
    name: "Dai Stablecoin",
  },
];

// Chainlink price feed addresses (Base Goerli examples, replace with mainnet as needed)
const CHAINLINK_FEEDS: Record<string, string> = {
  USDC: "0xAb5c49580294Aff77670F839ea425f5b78ab3Ae7", // USDC/USD
  EUROC: "0x44390589104C9164407A0E0562a9DBe6C24A0E05", // EUR/USD
  DAI: "0x0d79df66BE487753B02D015Fb622DED7f0E9798d", // DAI/USD
};

const TOKEN_ICONS: Record<string, string> = {
  USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026",
  EUROC: "https://cryptologos.cc/logos/euro-coin-euroc-logo.png?v=026",
  DAI: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=026",
};

interface WalletDashboardProps {
  provider: BrowserProvider;
  walletAddress: string;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ provider, walletAddress }) => {
  const balances = useTokenBalances(provider, walletAddress, TOKENS);
  const usdcPrice = useChainlinkPrice(provider, CHAINLINK_FEEDS.USDC);
  const eurocPrice = useChainlinkPrice(provider, CHAINLINK_FEEDS.EUROC);
  const daiPrice = useChainlinkPrice(provider, CHAINLINK_FEEDS.DAI);
  const [usdInput, setUsdInput] = useState("");
  const [selectedToken, setSelectedToken] = useState("USDC");

  const priceMap: Record<string, number | null> = {
    USDC: usdcPrice,
    EUROC: eurocPrice,
    DAI: daiPrice,
  };

  const tokenAmount = (() => {
    const price = priceMap[selectedToken];
    if (!price || !usdInput) return "";
    return (parseFloat(usdInput) / price).toFixed(6);
  })();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Wallet Dashboard</h2>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="mb-2 font-semibold">USD to Token Converter</div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            value={usdInput}
            onChange={e => setUsdInput(e.target.value)}
            placeholder="USD Amount"
            className="border px-2 py-1 rounded w-32"
          />
          <select
            value={selectedToken}
            onChange={e => setSelectedToken(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {TOKENS.map(t => (
              <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
            ))}
          </select>
          <span className="ml-2">=
            <span className="font-mono ml-2">{tokenAmount}</span>
            <span className="ml-1">{selectedToken}</span>
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {priceMap[selectedToken] ? `1 ${selectedToken} = $${priceMap[selectedToken]}` : "Fetching price..."}
        </div>
      </div>
      <div className="space-y-4">
        {balances.map(({ token, formatted }) => {
          const icon = TOKEN_ICONS[token.symbol] || "";
          const price = priceMap[token.symbol] || 0;
          const usdValue = (parseFloat(formatted) * price).toFixed(2);
          return (
            <div key={token.address} className="flex items-center p-4 border rounded-lg">
              <img src={icon} alt={token.symbol} className="w-10 h-10 mr-4" />
              <div className="flex-1">
                <div className="font-semibold">{token.symbol}</div>
                <div className="text-gray-500 text-sm">{token.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg">{formatted}</div>
                <div className="text-xs text-gray-400">${usdValue} USD</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletDashboard; 