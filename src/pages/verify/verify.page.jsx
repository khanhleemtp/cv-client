import { useEffect } from 'react';
import { verifyStart } from '../../redux/user/user.action';
import Button from './../../components/button/button.component';
import { connect } from 'react-redux';
const VerifyPage = ({ getVerify }) => {
  useEffect(() => {
    getVerify();

    return () => {};
  }, [getVerify]);

  return (
    <div>
      <Button size="small" text="Verify" />
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVerify: () => {
    let arrLocation = String(ownProps?.location?.search).slice(1).split('&');
    console.log(arrLocation);
    const token = arrLocation?.[0].split('=')?.[1];
    const role = arrLocation?.[1].split('=')?.[1];
    return dispatch(verifyStart({ token, role }));
  },
});

export default connect(null, mapDispatchToProps)(VerifyPage);
