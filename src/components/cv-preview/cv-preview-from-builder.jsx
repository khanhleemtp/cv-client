import PDFViewer from '../pdf-preview/pdf-preview.component';
import CvPdfTemplate from '../CvBuilderPdf/CvPdfTemplate';
import {
  selectCvData,
  selectCvHeader,
  selectCvSections,
  selectCvStyle,
  selectLoadingApi,
  selectCvTitle,
  selectCreatingCv,
} from '../../redux/cv/cv.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const CvPreviewFromBuilder = ({
  sections,
  header,
  isLoadingCv,
  style,
  title,
  isCreating,
}) => {
  return (
    <>
      {isLoadingCv ? (
        <div>Đang tải...</div>
      ) : isCreating ? (
        <div>Đang tạo cv</div>
      ) : (
        <PDFViewer>
          <CvPdfTemplate
            sections={sections}
            header={header}
            style={style}
            title={title}
          />
        </PDFViewer>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cvData: selectCvData,
  sections: selectCvSections,
  header: selectCvHeader,
  style: selectCvStyle,
  title: selectCvTitle,
  isLoadingCv: selectLoadingApi,
  isCreating: selectCreatingCv,
});

export default connect(mapStateToProps, null)(CvPreviewFromBuilder);
