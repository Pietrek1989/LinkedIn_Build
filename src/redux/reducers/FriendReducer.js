import {  FRIEND } from "../actions";

const initialState = {
  Friend: [],
};

const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIEND:
        if(!state.Friend.includes(payload._id)){
      return {
        ...state,
        Friend: [...state.Friend, action.payload],
      };
    }else{
     return{
     ...state,
     Friend: [...state.Friend.filter((req)=>req !== action.payload)],

     }

    }
    default:
      return state;
  }
};

export default FriendReducer;