import { SEND, RECIEVE, UNSEND,UNRECIEVE, DECLINE} from "../actions";

const initialState = {
 
  Recieved:[]
};

const FriendRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    
        case RECIEVE:
            if(!state.Recieved.includes(action.payload._id)){
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
    case DECLINE :
     return{
      ...state,
      Recieved: [...state.Recieved.filter((req)=>req !== action.payload)]
     }
   

    default:
      return state;
  }
};

export default FriendRequestReducer;