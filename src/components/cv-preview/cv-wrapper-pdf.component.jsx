import PDFViewer from '../pdf-preview/pdf-preview.component';
import CvPdfTemplate from '../CvBuilderPdf/CvPdfTemplate';

const CvWrapperPdf = () => {
  return (
    <div>
      <PDFViewer>
        <CvPdfTemplate />
      </PDFViewer>
    </div>
  );
};

export default CvWrapperPdf;
