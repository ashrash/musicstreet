/* eslint-disable import/prefer-default-export */
import {
  takeEvery, all, put, call,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  BUTTON_CLICK, SET_VALUE, SET_WALLET_ADDRESS, AUTHENTICATE_USER,
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
  if (user) {
    yield put({ type: SET_WALLET_ADDRESS, payload: data });
  }
}

function* watchButtonClick() {
  yield takeEvery(BUTTON_CLICK, buttonClick);
}

function* watchAuthUser() {
  yield takeEvery(AUTHENTICATE_USER, authUser);
}

export function* combinedSaga() {
  yield all([
    watchButtonClick(),
    watchAuthUser(),
  ]);
}
