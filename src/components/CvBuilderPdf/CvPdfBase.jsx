import PDFViewer from './../pdf-preview/pdf-preview.component';
import CvPdfTemplate from './CvPdfTemplate';

const CvPdfBase = ({ sections, header }) => {
  return (
    <PDFViewer>
      <CvPdfTemplate sections={sections} header={header} />
    </PDFViewer>
  );
};

export default CvPdfBase;
