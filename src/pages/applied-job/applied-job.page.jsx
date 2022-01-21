import NavContainer from '../../components/nav-container/nav-container.component';
import { createStructuredSelector } from 'reselect';
import { selectIdsCvCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { loadListResumeJobStart } from './../../redux/resumeJob/resumeJob.action';
import {
  selectListResumeJob,
  selectLoadingListResumeJob,
} from './../../redux/resumeJob/resumeJob.selectors';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import ListAppliedJob from './list-job-applied.component';

const AppliedJob = ({ user }) => {
  // if (user?.role === 'employer') return null;
  return (
    <NavContainer>
      {user?.role === 'user' ? (
        <ListAppliedJob />
      ) : (
        <div className="text-center p-4 font-medium">
          Bạn không thể ứng tuyển, hãy đăng ký tài khoản ứng viên ngay
        </div>
      )}
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  idsCv: selectIdsCvCurrentUser,
  appliedList: selectListResumeJob,
  loading: selectLoadingListResumeJob,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  loadAppiedJob: (qr) => dispatch(loadListResumeJobStart(qr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppliedJob);
