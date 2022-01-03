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

const CvManager = lazy(() =>
  pMinDelay(
    import('../../components/company/cv-manager/cv-manager.component'),
    1200
  )
);

const News = lazy(() =>
  pMinDelay(import('./../../components/company/news/news.component'), 1200)
);

const CompanyDashboard = ({ ...props }) => {
  const { id } = useParams();
  // let id = props?.match?.params?.id;
  console.log('props', props);

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
      default:
        return <NotFound />;
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <HeaderForBusiness
        title={renderTitle(id)}
        navigationData={['home', 'campaign', 'news', 'cv', 'report']}
      >
        {renderComponent(id)}
      </HeaderForBusiness>
    </Suspense>
  );
};

export default CompanyDashboard;
