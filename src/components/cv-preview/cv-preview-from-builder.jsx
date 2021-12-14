import PDFViewer from '../pdf-preview/pdf-preview.component';
import CvPdfTemplate from '../CvBuilderPdf/CvPdfTemplate';
import {
  selectCvData,
  selectCvHeader,
  selectCvSections,
  selectCvStyle,
  selectLoadingApi,
} from '../../redux/cv/cv.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const CvPreviewFromBuilder = ({ sections, header, isLoadingCv, style }) => {
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
  cvData: selectCvData,
  sections: selectCvSections,
  header: selectCvHeader,
  style: selectCvStyle,
  isLoadingCv: selectLoadingApi,
});

export default connect(mapStateToProps, null)(CvPreviewFromBuilder);
