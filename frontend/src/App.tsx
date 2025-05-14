import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import { BrowserProvider } from "ethers";
import "./App.css";

function App() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [address, setAddress] = useState<string>("");

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const ethProvider = new BrowserProvider((window as any).ethereum);
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const signer = await ethProvider.getSigner();
      const addr = await signer.getAddress();
      setProvider(ethProvider);
      setAddress(addr);
    } else {
      alert("MetaMask not found");
    }
  };

  return (
    <div className="App min-h-screen bg-gray-100">
      <header className="App-header">
        <button
          onClick={connectWallet}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
