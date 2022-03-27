/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

import './Login.scss';

function Login() {
  const [walletAccount, setWalletAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentChain, setCurrentChain] = useState('');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('Account changed: ', accounts[0]);
        setWalletAccount(accounts[0]);
      });
      window.ethereum.on('chainChanged', (chaindId) => {
        console.log('Chain ID changed: ', chaindId);
        setCurrentChain(chaindId);
      });
    } else {
      alert('Please install MetaMask to use this service!');
    }
  }, []);

  useEffect(() => {
    setIsConnected(!!walletAccount);
  }, [walletAccount]);

  const handleConnectWallet = async () => {
    console.log('Connecting MetaMask...');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log('Account: ', account);
    setWalletAccount(account);
  };

  return (
    <div>
      <img
        alt="hello"
        className="center-screen"
        onClick={handleConnectWallet}
        src="/static/img/metamask.png"
      />
      <h1>
        Wallet Address:
        {walletAccount}
      </h1>
    </div>
  );
}
// Login.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Login;
