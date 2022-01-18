import { all, call } from 'redux-saga/effects';
import { cvSagas } from './cv/cv.sagas';
import { userSagas } from './user/user.sagas';
import { employerSagas } from './employer/employer.sagas';
import { companySagas } from './company/company.sagas';
import { jobSagas } from './job/job.sagas';
import { resumeJobSagas } from './resumeJob/resumeJob.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(cvSagas),
    call(employerSagas),
    call(companySagas),
    call(jobSagas),
    call(resumeJobSagas),
  ]);
}
