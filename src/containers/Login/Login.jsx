/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticateUser } from '../../state/ducks/user/actions';

import './Login.scss';

function Login({ isAuthenticated, history }) {
  const dispatch = useDispatch();
  const [walletAccount, setWalletAccount] = useState('');
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
    if (isAuthenticated) {
      history.push('/landing');
    }
  }, [isAuthenticated]);

  const handleConnectWallet = async () => {
    dispatch(authenticateUser());
  };

  return (
    <div>
      <img
        alt="hello"
        className="center-screen"
        onClick={handleConnectWallet}
        src="/static/img/metamask.png"
      />
    </div>
  );
}

Login.defaultProps = {
  isAuthenticated: false,
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isAuthenticated: PropTypes.bool,
};

export default Login;
