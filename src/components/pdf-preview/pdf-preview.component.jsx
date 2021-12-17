import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { pdf } from '@react-pdf/renderer';
import { useResizeDetector } from 'react-resize-detector';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ children, isOnePage = false }) => {
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
    <div ref={ref} className="max-w-3xl mx-auto container my-8 relative">
      <Document
        file={pdfUrl}
        loading={() => <div>Tạo Cv ...</div>}
        noData={() => <div>Lấy dữ liệu ...</div>}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {isOnePage ? (
          <Page
            className="my-8 shadow-2xl rounded-lg"
            renderMode="svg"
            pageNumber={1}
            width={width ? width : 1}
          />
        ) : (
          Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => (
              <Page
                key={page}
                className="my-8 shadow-2xl rounded-lg"
                renderMode="svg"
                pageNumber={page}
                width={width ? width : 1}
              />
            ))
        )}
      </Document>
    </div>
  );
};

export default PDFViewer;
