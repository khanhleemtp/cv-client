import { Suspense, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { useParams } from 'react-router-dom';

// COMPONENT
import NavContainer from '../../components/nav-container/nav-container.component';
// import CvContainer from '../../components/CvSection/CvContainer';

// REDUX
import { loadCvStart } from '../../redux/cv/cv.action';
import { selectLoadingApi } from './../../redux/cv/cv.selectors';
// import CvContainer from '../../components/CvSection/CvContainer';

const CvContainer = lazy(() =>
  pMinDelay(import('../../components/CvSection/CvContainer'), 1000)
);

const CvBuilderPage = ({ isLoading }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(loadCvStart(id));
    return () => {};
  }, [id, dispatch]);

  return isLoading ? (
    <div>Đang tải...</div>
  ) : (
    <NavContainer>
      <Suspense fallback={<div>Đang tải...</div>}>
        <CvContainer />
      </Suspense>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingApi,
});

export default connect(mapStateToProps)(CvBuilderPage);
