import { useEffect } from 'react';
import NavContainer from '../../components/nav-container/nav-container.component';
import { createStructuredSelector } from 'reselect';
import { selectIdsCvCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import JobCard from '../../components/job-card/job-card.component';
import { Link } from 'react-router-dom';
import { loadListResumeJobStart } from '../../redux/resumeJob/resumeJob.action';
import {
  selectListResumeJob,
  selectLoadingListResumeJob,
} from '../../redux/resumeJob/resumeJob.selectors';
import LoadingSmall from '../../components/loading-small/loading-small.component';

const ListAppliedJob = ({ idsCv, appliedList, loadAppiedJob, loading }) => {
  useEffect(() => {
    loadAppiedJob(`?resume[in]=${idsCv}`);
  }, [idsCv, loadAppiedJob]);

  // if (user?.role === 'employer') return null;
  return (
    <NavContainer>
      <div className="container mx-auto max-w-2xl p-2">
        <div className="text-xl">Việc làm ứng tuyển</div>
        {loading ? (
          <LoadingSmall />
        ) : !appliedList ? (
          <div>Bạn chưa có Cv nào</div>
        ) : appliedList?.length === 0 ? (
          <div>Bạn chưa ứng tuyển vào việc nào</div>
        ) : (
          <div className="space-y-2">
            {appliedList?.map((job) => (
              <div className="space-y-1 flex flex-col">
                <Link
                  to={`/preview/${job?.resumeInfo.id}`}
                  className="text-indigo-500 hover:text-indigo-600 self-end"
                >
                  Xem Cv
                </Link>
                <JobCard job={job.jobInfo} />
              </div>
            ))}
          </div>
        )}
      </div>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  idsCv: selectIdsCvCurrentUser,
  appliedList: selectListResumeJob,
  loading: selectLoadingListResumeJob,
});

const mapDispatchToProps = (dispatch) => ({
  loadAppiedJob: (qr) => dispatch(loadListResumeJobStart(qr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListAppliedJob);
