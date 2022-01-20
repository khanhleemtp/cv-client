import { XIcon } from '@heroicons/react/solid';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/viewState/viewState.action';
import { createStructuredSelector } from 'reselect';
import {
  selectListCvCurrentUser,
  selectCurrentUser,
} from './../../redux/user/user.selectors';
import { useHistory } from 'react-router-dom';
import { selectJobInOtherPropsModal } from './../../redux/viewState/viewState.selectors';
import moment from 'moment';
import { applyJobStart } from './../../redux/job/job.action';

const ChoiceCvModal = ({ modalRef, close, listCv, job, applyJob, user }) => {
  const handleAppy = (resumeId) => () => {
    applyJob({ job, resumeId, name: user?.name });
    close();
  };

  const history = useHistory();

  return (
    <div className="bg-white mx-2 shadow-lg rounded-lg w-full p-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">Vui lòng chọn CV</p>
        <button
          ref={modalRef}
          onClick={close}
          className="text-indigo-500 hover:text-indigo-300"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="my-4">Ứng tuyển vị trí: {job?.title}</div>
      <div className="flex flex-col items-center justify-center">
        {listCv?.length === 0 ? (
          <Button
            text="Tạo CV ngay"
            onClick={() => {
              history.push('/list-cv');
              close();
            }}
          />
        ) : (
          <div className="space-y-4">
            {listCv?.map((cv) => (
              <div key={cv?.id} className="flex space-x-2">
                <div>
                  <div>
                    Tiêu đề: {cv?.title ? cv?.title : 'Chưa đặt tiêu đề'}
                  </div>
                  <div>
                    Thời điểm cập nhật:{' '}
                    {moment(cv?.createdAt).format('DD/MM/YYYY')}
                  </div>
                </div>
                <Button text="Chọn" onClick={handleAppy(cv?.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  listCv: selectListCvCurrentUser,
  job: selectJobInOtherPropsModal,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
  applyJob: (data) => dispatch(applyJobStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceCvModal);
