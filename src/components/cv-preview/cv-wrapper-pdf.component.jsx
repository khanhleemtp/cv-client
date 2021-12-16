import { useEffect } from 'react';
import PDFViewer from '../pdf-preview/pdf-preview.component';
import CvPdfTemplate from '../CvBuilderPdf/CvPdfTemplate';
import { loadCvStart } from '../../redux/cv/cv.action';
import {
  selectCvHeader,
  selectCvSections,
  selectCvStyle,
  selectLoadingApi,
} from '../../redux/cv/cv.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

const CvWrapperPdf = ({ loadCv, sections, header, isLoadingCv, style }) => {
  const { id } = useParams();
  useEffect(() => {
    loadCv(id);
  }, [loadCv, id]);

  return (
    <div>
      {isLoadingCv ? (
        <div>Đang tải</div>
      ) : (
        <PDFViewer>
          <CvPdfTemplate sections={sections} header={header} style={style} />
        </PDFViewer>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectCvSections,
  header: selectCvHeader,
  style: selectCvStyle,
  isLoadingCv: selectLoadingApi,
});

const mapDispatchToProps = (dispatch) => ({
  loadCv: (id) => dispatch(loadCvStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvWrapperPdf);
