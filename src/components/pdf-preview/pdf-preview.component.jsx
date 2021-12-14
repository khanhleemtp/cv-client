import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { pdf } from '@react-pdf/renderer';
import { useResizeDetector } from 'react-resize-detector';
import Loading from './../loading/loading.component';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ children }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const child = React.Children.only(children);

    pdf(child)
      .toBlob()
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
      });
  }, [children]);
  const { width, ref } = useResizeDetector();

  const [numPages, setNumPages] = useState(null);
  return (
    <div ref={ref} className="max-w-3xl mx-auto container  my-8">
      <Document
        file={pdfUrl}
        loading={() => <Loading />}
        noData={() => <Loading />}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            <Page
              className="my-8 shadow-lg rounded-lg"
              // className="my-6 relative"
              renderMode="svg"
              pageNumber={page}
              width={width ? width : 1}
            />
          ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
