import moment from 'moment';
import { HeartIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import {
  selectSavedJobInCurrentUser,
  selectIsJobSaved,
} from './../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { userSaveJobStart } from './../../redux/user/user.action';

const JobCard = ({ job, saveJob, isSaved = false }) => {
  return (
    <div className="space-y-2 w-full h-32 shadow-2xl ring-1 ring-gray-300 rounded-md p-4 hover:bg-gray-200">
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 md:h-12 md:w-12 rounded-lg">
          <img
            src={job?.companyInfo?.logo}
            alt=""
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="space-y-1 flex-grow w-1/4">
          <Link to={`/job-page/${job?._id}`}>
            <div
              className={clsx(
                'truncate text-gray-600 capitalize font-medium md:w-full max-w-xs'
              )}
              title={job?.title}
            >
              {job?.title}
            </div>
          </Link>
          <Link to={`/company-page/${job?.companyInfo?.id}`}>
            <div
              className={clsx(
                'truncate text-gray-600 capitalize md:w-full max-w-xs'
              )}
              title={job?.companyInfo?.name}
            >
              {job?.companyInfo?.name}
            </div>
          </Link>
        </div>
        <div
          className="flex items-center justify-center ring-1 w-6 h-6 p-1 rounded-md ring-indigo-300 cursor-pointer"
          onClick={saveJob}
        >
          <HeartIcon
            className={clsx('w-full h-full', { 'text-red-500': isSaved })}
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="px-2 truncate bg-gray-300 rounded-lg text-sm">
          {job?.salary} triệu
        </div>
        <div className="px-2 truncate bg-gray-300 rounded-lg text-sm flex space-x-1">
          {job?.area?.map((area) => (
            <div key={area}>
              {area}
              {area !== job.area[job.area.length - 1] ? ',' : '.'}
            </div>
          ))}
        </div>
        <div className="px-2 truncate bg-gray-300 rounded-lg text-sm flex space-x-1">
          {job?.skills?.map((area) => (
            <div key={area}>
              {area}
              {area !== job.skills[job?.skills?.length - 1] ? ',' : '.'}
            </div>
          ))}
        </div>
      </div>
      <div className="px-2 truncate rounded-lg text-sm flex-grow flex justify-end">
        Còn {moment(job?.to).fromNow()} để ửng tuyển
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveJob: () => dispatch(userSaveJobStart(ownProps.job.id)),
});

const mapStateToProps = (state, ownProps) => ({
  savedJobs: selectSavedJobInCurrentUser(state),
  isSaved: selectIsJobSaved(ownProps?.job?.id)(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);
