import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter } from 'connected-react-router';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = (history) =>
  combineReducers({
    user: userReducer,
    router: connectRouter(history),
  });

const root = (history) => persistReducer(persistConfig, rootReducer(history));
export default root;
