import {  FriendUnfriend } from "../actions";

const initialState = {
  Friend: [],
};

const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FriendUnfriend:
      return {
        ...state,
        Friend: [...state.Friend, action.payload],
      };
    default:
      return state;
  }
};

export default FriendReducer;