import CvPdfTemplate from '../CvBuilderPdf/CvPdfTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import CvWrapperPdf from './cv-wrapper-pdf.component';
import { connect } from 'react-redux';
import {
  selectCvHeader,
  selectCvSections,
  selectLoadingApi,
  selectCvTitle,
} from '../../redux/cv/cv.selectors';
import { selectCvStyle } from './../../redux/cv/cv.selectors';
import { createStructuredSelector } from 'reselect';
const CvPreview = ({ sections, header, style, isLoadingCv, title }) => {
  return (
    <div>
      <div className="flex">
        <Link to="/" className="mr-2">
          Trang chủ
        </Link>
        {isLoadingCv ? (
          <div>Đang tải</div>
        ) : (
          <PDFDownloadLink
            document={
              <CvPdfTemplate
                sections={sections}
                header={header}
                style={style}
                title={title}
              />
            }
            fileName={`${title}.ld-cv.pdf`}
          >
            {({ loading, error }) =>
              loading ? (
                'Đang tải...'
              ) : error ? (
                <div>{JSON.stringify(error)}</div>
              ) : (
                'Tải xuống ngay 🖨️!'
              )
            }
          </PDFDownloadLink>
        )}
      </div>
      <CvWrapperPdf />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectCvSections,
  title: selectCvTitle,
  header: selectCvHeader,
  style: selectCvStyle,
  isLoadingCv: selectLoadingApi,
});

export default connect(mapStateToProps)(CvPreview);
