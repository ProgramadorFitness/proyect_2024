import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiWallet } from 'react-icons/gi';
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfListProps {
  clientId: string;
}

interface PdfInfo {
  fileName: string;
  numPages: number;
}

const PdfList: React.FC<PdfListProps> = ({ clientId }) => {
  const [pdfDocuments, setPdfDocuments] = useState<PdfInfo[]>([]);
  const [modal, setModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfnumber, setPdfNUmber] = useState(0)

  useEffect(() => {
    // Hacer la solicitud GET a la API para obtener la lista de documentos
    axios.get<PdfInfo[]>(`http://localhost:5001/api/pdfDocuments/uploadImage/${clientId}`)
      .then(response => setPdfDocuments(response.data))
      .then(response => setPdfNUmber(pdfDocuments.length))
      .catch(error => {
        console.error('Error al obtener la lista de documentos:', error);
      });
  }, [clientId]);

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  return (
    <>
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button" onClick={() => setModal(true)}>
        <GiWallet size={25} />
      </button>

      {modal ? (
        <>
          <div className='p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center overflow-y-auto overflow-x-auto'>
            <div className='bg-slate-400 rounded flex flex-col items-center gap-5 overflow-y-auto overflow-x-auto'>
              <div className="p-8 ">
                <form>
                  <div className='flex justify-between mb-4'>
                    <button className="px-4 py-2 bg-blue-300 text-white rounded" onClick={() => setModal(false)}>
                      Close
                    </button>
                    <div className='flex gap-2'>
                      <button className="px-4 py-2 bg-blue-300 text-white rounded" onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber <= 1}>
                        Previous
                      </button>
                      <button className="px-4 py-2 bg-blue-300 text-white rounded" onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber >= pdfDocuments.length}>
                        Next
                      </button>
                    </div>
                  </div>

                  {pdfDocuments.map((pdf, index) => (
                    <div key={index} className="mb-4">
                      <Document file={`http://localhost:5001/${pdf}`}>
                        {Array.from(new Array(pdfnumber), (el, index) => (
                          <Page key={index} pageNumber={index + 1} />
                        ))}
                      </Document>
                    </div>
                  ))}

                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};


export default PdfList;