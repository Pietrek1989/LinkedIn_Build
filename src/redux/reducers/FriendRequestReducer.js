import { SEND, RECIEVE, UNSEND,UNRECIEVE} from "../actions";

const initialState = {
  Sent: [],
  Recieved:[]
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND:
      return {
        ...state,
        Sent: [...state.Sent, action.payload],
      };
      case UNSEND:
        return {
          ...state,
          Sent: [...state.Sent.filter((fav) => fav !== action.payload)],
        };
        case RECIEVE:
      return {
        ...state,
        Recieved: [...state.Recieved, action.payload],
      };
    case UNRECIEVE:
      return {
        ...state,
        Recieved: state.Recieved.filter((fav) => fav !== action.payload),
      };

    default:
      return state;
  }
};

export default likeReducer;