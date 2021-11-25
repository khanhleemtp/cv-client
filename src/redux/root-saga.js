import { all, call } from 'redux-saga/effects';
import { cvSagas } from './cv/cv.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(cvSagas)]);
}
