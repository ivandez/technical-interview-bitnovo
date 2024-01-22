"use client";

import { useSDK } from "@metamask/sdk-react";

export const ConnectWalletButton = () => {
  const pay = async () => {
    if (typeof window.ethereum !== "undefined") {
      // MetaMask is installed
      try {
        // Request user's account
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account =
          accounts && Array.isArray(accounts) && accounts.length > 0
            ? accounts[0]
            : null;

        // Set up the transaction parameters
        const transactionParameters = {
          to: "0x808f360e73452a7c38Fa71ACb72F992C60a11fAe", // The address of the recipient
          from: account, // The address of the sender
          value: "1000000000000000000", // The amount to send (in wei)
        };

        // Send the transaction
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        console.log("Transaction sent with hash:", txHash);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      console.log("MetaMask is not installed");
    }
  };

  const { sdk, connected, connecting } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div className="relative">
      {connected ? (
        <button
          onClick={disconnect}
          className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
        >
          Disconnect
        </button>
      ) : (
        <>
          <button disabled={connecting} onClick={connect}>
            METAMASK
          </button>
        </>
      )}
    </div>
  );
};
