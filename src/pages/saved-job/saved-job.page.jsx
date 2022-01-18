import React from 'react';
import NavContainer from './../../components/nav-container/nav-container.component';
import { createStructuredSelector } from 'reselect';
import { selectSavedJobInCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import JobCard from './../../components/job-card/job-card.component';

const SavedJob = ({ savedJobs }) => {
  return (
    <NavContainer>
      <div className="container mx-auto max-w-2xl pt-4">
        <div className="py-4 font-medium text-xl">Việc làm đã lưu</div>
        {savedJobs?.length === 0 ? (
          <div>Bạn chưa lưu việc nào</div>
        ) : (
          <div className="space-y-2">
            {savedJobs?.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        )}
      </div>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  savedJobs: selectSavedJobInCurrentUser,
});

export default connect(mapStateToProps)(SavedJob);
