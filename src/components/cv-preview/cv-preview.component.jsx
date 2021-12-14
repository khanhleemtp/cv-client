import PDFViewer from './../pdf-preview/pdf-preview.component';
// import CvTemplateOne from './../cv-template/cv-template-one/cv-template-one';
import CvPdfTemplate from '../CvBuilderPdf/CvPdfTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
const CvPreview = () => {
  return (
    <div>
      <div className="flex">
        <Link to="/" className="mr-2">
          Trang chủ
        </Link>
        <PDFDownloadLink document={<CvPdfTemplate />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Đang tải...' : 'Tải xuống ngay 🖨️!'
          }
        </PDFDownloadLink>
      </div>
      <PDFViewer>
        {/* <CvTemplateOne /> */}
        <CvPdfTemplate />
      </PDFViewer>
    </div>
  );
};

export default CvPreview;
