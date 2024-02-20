import React, { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfId: string; // El ID del PDF que quieres mostrar
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfId }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPdfData] = useState<{ originalname: string; mimetype: string; filename: string; size: number; id_cliente: string } | null>(null);

  useEffect(() => {
    // Función para cargar los metadatos del PDF desde el servidor
    const fetchPdfData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/pdfDocuments/upload/${pdfId}`);
        setPdfData(response.data);
        
      } catch (error) {
        console.error('Error al cargar los metadatos del PDF:', error);
      }
    };

    fetchPdfData();
  }, [pdfId]);

  // Función para manejar cambios de página
  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  // Renderizar el componente de visualización de PDF
  return (
    <div>
      {pdfData ? (
        <div>
          <Document file={`/upload/${pdfId}`} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Página {pageNumber} de {numPages}
          </p>
          <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber <= 1}>
            Anterior
          </button>
          <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber >= numPages}>
            Siguiente
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default PdfViewer;