import { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { useParams } from 'react-router-dom';

// COMPONENT

// REDUX
import { loadCvStart } from '../../redux/cv/cv.action';
import { selectLoadingApi } from './../../redux/cv/cv.selectors';
import Loading from '../../components/loading/loading.component';

const CvContainer = lazy(() =>
  pMinDelay(import('../../components/CvSection/CvContainer'))
);

const CvBuilderPage = ({ isLoading, ...props }) => {
  const dispatch = useDispatch();
  console.log(props.match.params.id);
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadCvStart(id));
  }, [id, dispatch]);

  return isLoading ? <Loading /> : <CvContainer />;
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingApi,
});

export default connect(mapStateToProps)(CvBuilderPage);
