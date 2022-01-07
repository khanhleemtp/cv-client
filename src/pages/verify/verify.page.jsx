import { useEffect } from 'react';
import { verifyStart } from '../../redux/user/user.action';
import { connect } from 'react-redux';
const VerifyPage = ({ getVerify }) => {
  useEffect(() => {
    getVerify();

    return () => {};
  }, [getVerify]);

  return (
    <div className="bg-resume-img bg-contain h-screen w-full bg-no-repeat">
      Xác thực tài khoản ...
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVerify: () => {
    let arrLocation = String(ownProps?.location?.search).slice(1).split('&');
    const token = arrLocation?.[0].split('=')?.[1];
    const role = arrLocation?.[1].split('=')?.[1];
    return dispatch(verifyStart({ token, role }));
  },
});

export default connect(null, mapDispatchToProps)(VerifyPage);
