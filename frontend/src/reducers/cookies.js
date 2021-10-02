import { GET_COOKIE, UPDATE_COOKIE, DELETE_COOKIE} from '../constants/constants';

const initialState = {
  cookie: null,
};

const cookieReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_COOKIE:
      return { ...state, cookie: action.cookie };

    case UPDATE_COOKIE:
      return { ...state, cookie: action.cookie };
    
    case DELETE_COOKIE:
      return {...state, cookie: null};
      
    default:
      return state;
  }
}

export default cookieReducer;