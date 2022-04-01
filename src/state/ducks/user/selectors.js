import * as R from 'ramda';

const getUserName = (state) => R.pathOr('', ['user', 'name'], state);

const getWalletAddress = (state) => R.pathOr(null, ['user', 'walletAddress'], state);

const isAuthenticated = (state) => !R.isNil(getWalletAddress(state));

const getNewUser = (state) => R.pathOr(null, ['user', 'newUser'], state);

const getNewAccount = (state) => R.pathOr(null, ['user', 'account'], state);

const selectors = {
  getUserName,
  getWalletAddress,
  isAuthenticated,
  getNewUser,
  getNewAccount,
};

export default selectors;
