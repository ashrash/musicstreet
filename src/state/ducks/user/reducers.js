import * as R from 'ramda';
import {
  SET_VALUE,
  SET_WALLET_ADDRESS,
  NEW_USER,
  SET_NFT_DATA,
} from './types';

const defaultState = {
  isSelected: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_NFT_DATA: {
      const data = action.payload;
      return {
        ...state,
        nftData: data,
      };
    }
    case NEW_USER: {
      const account = action.payload;
      return {
        ...state,
        newUser: !R.isNil(account) && true,
        account,
      };
    }
    case SET_VALUE: {
      return {
        ...state,
        isSelected: true,
      };
    }
    case SET_WALLET_ADDRESS: {
      const user = action.payload;
      return {
        ...state,
        ...user,
      };
    }
    default:
      return state;
  }
};

export default reducer;
