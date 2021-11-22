import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import cvReducer from './cv/cv.reducer';
import userReducer from './user/user.reducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = (history) =>
  combineReducers({
    user: userReducer,
    router: connectRouter(history),
    cv: cvReducer,
  });

const root = (history) => persistReducer(persistConfig, rootReducer(history));
export default root;
