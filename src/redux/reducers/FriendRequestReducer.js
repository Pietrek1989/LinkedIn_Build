import { SEND, RECIEVE, UNSEND,UNRECIEVE} from "../actions";

const initialState = {
 
  Recieved:[]
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    
        case RECIEVE:
            if(!state.Recieved.includes(payload._id)){
      return {
        ...state,
        Recieved: [...state.Recieved, action.payload],
      };
    }else{
        return {
            ...state,
            Recieved: [...state.Recieved.filter((req)=>req !== action.payload)],
          }
    }
   

    default:
      return state;
  }
};

export default likeReducer;