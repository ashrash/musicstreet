import {
  SET_VALUE,
  SET_WALLET_ADDRESS,
} from './types';

const defaultState = {
  isSelected: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
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
