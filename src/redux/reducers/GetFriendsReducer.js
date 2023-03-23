import {  GET_ALL_FRIENDS } from "../actions";

const initialState = {
  allFr: [],
};

const allFriends = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FRIENDS:
      return {
        ...state,
        allFr: action.payload,
    }
    default:
      return state;
  }
};

export default allFriends;