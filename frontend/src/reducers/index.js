import { combineReducers } from 'redux';
import authReducer from './auth';
import messageReducer from './message';


const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
});

export default rootReducer;