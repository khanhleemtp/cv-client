import { useCallback } from 'react';
import { Suspense } from 'react';
import Loading from './../../components/loading/loading.component';
import { useParams } from 'react-router-dom';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import HeaderForBusiness from '../../components/header-for-business/header-for-business.component';
import NotFound from '../../components/not-found/not-found.component';
// import CvManager from '../../components/company/cv-manager/cv-manager.component';
// import News from './../../components/company/news/news.component';
import { connect } from 'react-redux';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import BaseModal from '../../components/Modal/BaseModal';

const AdminHome = lazy(() =>
  pMinDelay(import('./../../components/admin/admin-home.component'), 1200)
);

const AdminUser = lazy(() =>
  pMinDelay(import('../../components/admin/admin-user.component'), 1200)
);

const AdminDashboard = ({ user }) => {
  const { id } = useParams();
  // let id = props?.match?.params?.id;

  const renderTitle = useCallback((element) => {
    switch (element) {
      case 'admin-home':
        return 'Bảng tin';
      case 'admin-user':
        return 'Quản lý công ty';
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
      case 'admin-home':
        return <AdminHome />;
      case 'admin-user':
        return <AdminUser />;

      default:
        return <NotFound />;
    }
  }, []);

  if (user?.role !== 'admin') return <NotFound />;

  return (
    <Suspense fallback={<Loading />}>
      <HeaderForBusiness title={renderTitle(id)}>
        <BaseModal />
        {renderComponent(id)}
      </HeaderForBusiness>
    </Suspense>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(AdminDashboard);
