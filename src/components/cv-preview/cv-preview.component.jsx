import CvPdfTemplate from '../CvBuilderPdf/CvPdfTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import CvWrapperPdf from './cv-wrapper-pdf.component';
const CvPreview = () => {
  return (
    <div>
      <div className="flex">
        <Link to="/" className="mr-2">
          Trang chủ
        </Link>
        <PDFDownloadLink document={<CvPdfTemplate />} fileName="somename.pdf">
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
      </div>
      <CvWrapperPdf />
    </div>
  );
};

export default CvPreview;
