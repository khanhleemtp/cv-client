import { useCallback, useEffect, Suspense } from 'react';
import Loading from './../../components/loading/loading.component';
import { useParams } from 'react-router-dom';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import HeaderForBusiness from '../../components/header-for-business/header-for-business.component';
import Button from './../../components/button/button.component';
import NotFound from '../../components/not-found/not-found.component';
import { connect } from 'react-redux';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { requestVerifyStart } from './../../redux/user/user.action';
import BaseModal from '../../components/Modal/BaseModal';
import { loadingEmployerStart } from '../../redux/employer/employer.action';

const CvManager = lazy(() =>
  pMinDelay(import('../../components/company/cv-manager/cv-manager.component'))
);

const CompanyPreviewJob = lazy(() =>
  pMinDelay(
    import('./../../components/company/list-job/company-preview-job.component')
  )
);

const StaffManager = lazy(() =>
  pMinDelay(
    import('../../components/company/staff-manager/staff-manager.component')
  )
);

const News = lazy(() =>
  pMinDelay(import('./../../components/company/news/news.component'))
);

const AccountSetting = lazy(() =>
  pMinDelay(
    import('../../components/company/account-setting/account-setting.component')
  )
);

const CompanyDashboard = ({ user, requestVerifyUser, loadEmployer }) => {
  const { id } = useParams();
  // let id = props?.match?.params?.id;

  const renderTitle = useCallback((element) => {
    switch (element) {
      case 'home':
        return 'Bảng tin';
      case 'campaign':
        return 'Chiến dịch ';
      case 'cv':
        return 'Tin tuyển dụng';
      case 'staff':
        return 'Quản lý nhân viên';
      case 'report':
        return 'Báo cáo tuyển dụng';
      case 'setting':
        return 'Cài đặt tài khoản';
      default:
        return null;
    }
  }, []);

  const renderComponent = useCallback((element) => {
    switch (element) {
      case 'home':
        return <News />;
      case 'campaign':
        return <CompanyPreviewJob />;
      case 'cv':
        return <CvManager />;
      case 'staff':
        return <StaffManager />;
      case 'report':
        return null;
      case 'setting':
        return <AccountSetting />;
      default:
        return <NotFound />;
    }
  }, []);

  useEffect(() => {
    loadEmployer(user?.id);
    return () => {};
  }, [loadEmployer, user]);

  if (user?.role === 'user') return <NotFound />;

  return (
    <Suspense fallback={<Loading />}>
      {user?.verify === false ? (
        <HeaderForBusiness
          title="Xác thực tài khoản trước khi sử dụng"
          navigationData={[]}
        >
          <Button text="Xác thực" onClick={() => requestVerifyUser(user)} />
        </HeaderForBusiness>
      ) : (
        <HeaderForBusiness title={renderTitle(id)}>
          <BaseModal />
          {renderComponent(id)}
        </HeaderForBusiness>
      )}
    </Suspense>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  requestVerifyUser: (user) => dispatch(requestVerifyStart(user?.email)),
  loadEmployer: (id) => dispatch(loadingEmployerStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);
