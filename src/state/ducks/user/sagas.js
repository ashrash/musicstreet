/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import {
  takeEvery, all, put, call, select,
} from 'redux-saga/effects';
import axios from 'axios';
import selectors from './selectors';
import {
  BUTTON_CLICK,
  SET_VALUE,
  SET_WALLET_ADDRESS,
  AUTHENTICATE_USER, NEW_USER,
  SAVE_USER,
  FETCH_NFT_DATA,
} from './types';

function* buttonClick() {
  yield put({ type: SET_VALUE, payload: true });
}

function* authUser() {
  console.log('Connecting MetaMask...');
  const accounts = yield call(window.ethereum.request, { method: 'eth_requestAccounts' });
  const account = accounts[0];
  console.log('Account: ', account);
  const user = yield call(axios.get, `/api/user/${account}`);
  const { data } = user;
  if (data) {
    yield put({ type: SET_WALLET_ADDRESS, payload: data });
  } else {
    yield put({ type: NEW_USER, payload: account });
  }
}

function* saveUser(payload) {
  const userData = payload.payload;
  const walletAddress = yield select(selectors.getNewAccount);
  const newUser = {
    ...userData,
    walletAddress,
  };
  const user = yield call(axios.post, '/api/user/', newUser);
  const { data } = user;
  if (data) {
    yield put({ type: SET_WALLET_ADDRESS, payload: data });
    yield put({ type: NEW_USER, payload: null });
  }
}

function* getNFTUserData() {
  const walletAddress = yield select(selectors.getNewAccount);
  const user = yield call(axios.post, `/api/nft/${walletAddress}`);
}
function* watchButtonClick() {
  yield takeEvery(BUTTON_CLICK, buttonClick);
}

function* watchAuthUser() {
  yield takeEvery(AUTHENTICATE_USER, authUser);
}

function* watchSaveUser() {
  yield takeEvery(SAVE_USER, saveUser);
}

function* watchGetNFTUserData() {
  yield takeEvery(FETCH_NFT_DATA, getNFTUserData);
}

export function* combinedSaga() {
  yield all([
    watchButtonClick(),
    watchAuthUser(),
    watchSaveUser(),
  ]);
}
