import {  GET_ALL_REQS } from "../actions";

const initialState = {
  allReqs: [],
};

const allRequests = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REQS:
      return {
        ...state,
        allReqs: action.payload,
    }
    default:
      return state;
  }
};

export default allRequests;