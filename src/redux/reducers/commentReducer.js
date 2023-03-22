import { GET_COMMENTS } from "../actions";

const initialState = {
  content: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
