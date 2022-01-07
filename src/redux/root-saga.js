import { all, call } from 'redux-saga/effects';
import { cvSagas } from './cv/cv.sagas';
import { userSagas } from './user/user.sagas';
import { employerSagas } from './employer/employer.sagas';
import { companySagas } from './company/company.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(cvSagas),
    call(employerSagas),
    call(companySagas),
  ]);
}
