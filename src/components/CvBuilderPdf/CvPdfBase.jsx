import PDFViewer from './../pdf-preview/pdf-preview.component';

import CvPdfTemplate from './CvPdfTemplate';

const CvPdfBase = () => {
  return (
    <PDFViewer>
      <CvPdfTemplate />
    </PDFViewer>
  );
};

export default CvPdfBase;
