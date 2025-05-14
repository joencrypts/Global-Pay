import { useEffect, useState } from "react";
import { Contract, formatUnits, Provider } from "ethers";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
}

export interface TokenBalance {
  token: TokenInfo;
  balance: bigint;
  formatted: string;
}

export function useTokenBalances(
  provider: Provider | undefined,
  walletAddress: string | undefined,
  tokens: TokenInfo[]
): TokenBalance[] {
  const [balances, setBalances] = useState<TokenBalance[]>([]);

  useEffect(() => {
    if (!provider || !walletAddress || tokens.length === 0) {
      setBalances([]);
      return;
    }
    let isMounted = true;
    async function fetchBalances() {
      const results: TokenBalance[] = await Promise.all(
        tokens.map(async (token) => {
          try {
            const contract = new Contract(token.address, ERC20_ABI, provider);
            const [raw, decimals] = await Promise.all([
              contract.balanceOf(walletAddress),
              contract.decimals(),
            ]);
            return {
              token,
              balance: raw,
              formatted: formatUnits(raw, decimals),
            };
          } catch (e) {
            return {
              token,
              balance: 0n,
              formatted: "0",
            };
          }
        })
      );
      if (isMounted) setBalances(results);
    }
    fetchBalances();
    return () => {
      isMounted = false;
    };
  }, [provider, walletAddress, tokens]);

  return balances;
} 