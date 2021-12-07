import { Suspense, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';

// COMPONENT
import NavContainer from '../../components/nav-container/nav-container.component';
// import CvContainer from '../../components/CvSection/CvContainer';

// REDUX
import { loadCvStart } from '../../redux/cv/cv.action';
import { selectLoadingApi } from './../../redux/cv/cv.selectors';
import Loading from './../../components/loading/loading.component';
// import CvContainer from '../../components/CvSection/CvContainer';

const CvContainer = lazy(() =>
  pMinDelay(import('../../components/CvSection/CvContainer'), 1000)
);

const CvBuilderPage = ({ isLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCvStart('619ff2dd3f5cd425c0e24dd4'));
    return () => {};
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <NavContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <CvContainer />
      </Suspense>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingApi,
});

export default connect(mapStateToProps)(CvBuilderPage);
