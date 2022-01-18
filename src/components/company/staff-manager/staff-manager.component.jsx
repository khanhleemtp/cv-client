import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEmployerHost } from '../../../redux/employer/employer.selectors';
import ListStaffComponent from './list-staff.component';

const StaffManager = ({ isHost }) => {
  if (!isHost) return <div>Bạn không có quyền thực hiện điều này</div>;
  return <ListStaffComponent />;
};

const mapStateToProps = createStructuredSelector({
  isHost: selectEmployerHost,
});

export default connect(mapStateToProps)(StaffManager);
