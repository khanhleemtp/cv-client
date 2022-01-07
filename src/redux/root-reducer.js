import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import cvReducer from './cv/cv.reducer';
import userReducer from './user/user.reducer';
import employerReducer from './employer/employer.reducer';
import companyReducer from './company/company.reducer';

import storage from 'redux-persist/lib/storage';
import viewStateReducer from './viewState/viewState.reducer';

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
    viewState: viewStateReducer,
    employer: employerReducer,
    company: companyReducer,
  });

const root = (history) => persistReducer(persistConfig, rootReducer(history));
export default root;
