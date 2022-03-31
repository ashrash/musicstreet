import * as R from 'ramda';

const getUserName = (state) => R.pathOr('', ['user', 'name'], state);

const getWalletAddress = (state) => R.pathOr(null, ['user', 'walletAddress'], state);

const isAuthenticated = (state) => !R.isNil(getWalletAddress(state));

const selectors = {
  getUserName,
  getWalletAddress,
  isAuthenticated,
};

export default selectors;
