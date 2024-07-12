import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    };

    getBalance();
  }, [address]);

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSendTransaction = async () => {
    if (address) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const txCount = await signer.getTransactionCount();
        setTransactionCount(txCount + 1);
        const tx = await signer.sendTransaction({
          to: '0x...your recipient address...',
          value: ethers.utils.parseEther('1.0'),
        });
        console.log(tx);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Wallet</h1>
      <button onClick={handleConnect}>Connect to Ethereum</button>
      <p>Address: {address}</p>
      <p>Balance: {balance} ETH</p>
      <p>Transaction Count: {transactionCount}</p>
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </div>
  );
};

export default Wallet;
