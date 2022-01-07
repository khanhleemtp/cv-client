import { useCallback } from 'react';
import { Suspense } from 'react';
import Loading from './../../components/loading/loading.component';
import { useParams } from 'react-router-dom';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import HeaderForBusiness from '../../components/header-for-business/header-for-business.component';
import Button from './../../components/button/button.component';
import NotFound from '../../components/not-found/not-found.component';
// import CvManager from '../../components/company/cv-manager/cv-manager.component';
// import News from './../../components/company/news/news.component';
import { connect } from 'react-redux';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { requestVerifyStart } from './../../redux/user/user.action';

const CvManager = lazy(() =>
  pMinDelay(
    import('../../components/company/cv-manager/cv-manager.component'),
    1200
  )
);

const News = lazy(() =>
  pMinDelay(import('./../../components/company/news/news.component'), 1200)
);

const AccountSetting = lazy(() =>
  pMinDelay(
    import(
      '../../components/company/account-setting/account-setting.component'
    ),
    1200
  )
);

const CompanyDashboard = ({ user, requestVerifyUser }) => {
  const { id } = useParams();
  // let id = props?.match?.params?.id;

  const renderTitle = useCallback((element) => {
    switch (element) {
      case 'home':
        return 'Bảng tin';
      case 'campaign':
        return 'Chiến dịch ';
      case 'news':
        return 'Tin tuyển dụng';
      case 'cv':
        return 'Quản lý CV';
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
        return null;
      case 'news':
        return null;
      case 'cv':
        return <CvManager />;
      case 'report':
        return null;
      case 'setting':
        return <AccountSetting />;
      default:
        return <NotFound />;
    }
  }, []);

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
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);
