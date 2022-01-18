import { openModal } from './../../../redux/viewState/viewState.action';
import Button from './../../button/button.component';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const ButtonChoiceCv = ({ choiceCv }) => {
  const history = useHistory();
  return <Button text="Ứng tuyển ngay" onClick={choiceCv(history)} />;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  choiceCv: (history) => () => {
    if (!ownProps?.user) {
      toast.success('Bạn cần đăng nhập trước khi ứng tuyển');
      return history.push('/login');
    }
    return dispatch(openModal('CHOICE_CV', { job: ownProps?.job }));
  },
});

export default connect(null, mapDispatchToProps)(ButtonChoiceCv);
