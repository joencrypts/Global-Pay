import { useEffect, useState } from "react";
import { Contract, Provider } from "ethers";

const AGGREGATOR_V3_ABI = [
  "function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)",
  "function decimals() view returns (uint8)",
];

export function useChainlinkPrice(provider: Provider | undefined, feedAddress: string | undefined): number | null {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!provider || !feedAddress) {
      setPrice(null);
      return;
    }
    let isMounted = true;
    async function fetchPrice() {
      try {
        const feed = new Contract(feedAddress as string, AGGREGATOR_V3_ABI, provider);
        const [roundData, decimals] = await Promise.all([
          feed.latestRoundData(),
          feed.decimals(),
        ]);
        // roundData[1] is the price (int256)
        const priceNum = Number(roundData[1]) / 10 ** decimals;
        if (isMounted) setPrice(priceNum);
      } catch (e) {
        if (isMounted) setPrice(null);
      }
    }
    fetchPrice();
    return () => {
      isMounted = false;
    };
  }, [provider, feedAddress]);

  return price;
} 