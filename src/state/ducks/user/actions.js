/* eslint-disable import/prefer-default-export */
import {
  BUTTON_CLICK,
  AUTHENTICATE_USER,
  SAVE_USER,
  FETCH_NFT_DATA,
} from './types';

const onButtonClick = () => ({
  type: BUTTON_CLICK,
});

const authenticateUser = () => ({
  type: AUTHENTICATE_USER,
});

const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

const fetchNFTData = (payload) => ({
  type: FETCH_NFT_DATA,
  payload,
});

export {
  onButtonClick,
  authenticateUser,
  saveUser,
  fetchNFTData,
};
