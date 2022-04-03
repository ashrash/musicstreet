/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import {
  takeEvery, all, put, call, select,
} from 'redux-saga/effects';
import axios from 'axios';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import selectors from './selectors';
import {
  BUTTON_CLICK,
  SET_VALUE,
  SET_WALLET_ADDRESS,
  AUTHENTICATE_USER, NEW_USER,
  SAVE_USER,
  FETCH_NFT_DATA,
  SET_NFT_DATA,
  CREATE_NFT,
} from './types';
import NFTMarketplace from '../../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

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
  const walletAddress = yield select(selectors.getWalletAddress);
  const user = yield call(axios.get, `/api/nft/${walletAddress}`);
  const { data } = user;
  yield put({ type: SET_NFT_DATA, payload: data });
}

function* createNFT(payload) {
  const { price, file } = payload.payload;
  const formData = new FormData();
  formData.append('file', file);
  const url = yield call(axios.post, '/api/nft/store', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(url);
  // const walletAddress = yield select(selectors.getWalletAddress);

  // const web3Modal = new Web3Modal();
  // const connection = yield call(web3Modal.connect);
  // const provider = new ethers.providers.Web3Provider(connection);
  // const signer = provider.getSigner();

  // /* next, create the item */
  // const marketplaceAddress = '0x3e8e12EAf6A91EC932cf11eFD6Ca9029866F2Bb5';
  // const price = ethers.utils.parseUnits(nftPrice, 'ether');
  // const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
  // let listingPrice = yield call(contract.getListingPrice);
  // listingPrice = listingPrice.toString();
  // const transaction = yield call(contract.createToken, url, price, { value: listingPrice });
  // yield call(transaction.wait);
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

function* watchCreateNFT() {
  yield takeEvery(CREATE_NFT, createNFT);
}

export function* combinedSaga() {
  yield all([
    watchButtonClick(),
    watchAuthUser(),
    watchSaveUser(),
    watchGetNFTUserData(),
    watchCreateNFT(),
  ]);
}
