import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiWallet } from 'react-icons/gi';
import { pdfjs, Document, Page } from 'react-pdf';

interface FileInfo {
  fileName: string;
}

interface FileListProps {
  clientId: string;
}

const PdfList: React.FC<FileListProps> = ({ clientId }) => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Hacer la solicitud GET a la API para obtener la lista de archivos
    axios.get<FileInfo[]>(`http://localhost:5001/api/pdfDocuments/uploadImage/${clientId}`)
      .then(response => setFiles(response.data) )
      .then(response =>console.log(files))
      .catch(error => {
        console.error('Error al obtener la lista de archivos:', error);
      });
  }, [clientId]);

  const handlePageChange = (newPageNumber: number) => {
    setCurrentPage(newPageNumber);
  };

  return (
    <>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400"
        type="button"
        onClick={() => setModal(true)}
      >
        <GiWallet size={25} />
      </button>

      {modal && (
        <div className='p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center overflow-y-auto overflow-x-auto'>
          <div className='bg-slate-400 rounded flex flex-col items-center gap-5 overflow-y-auto overflow-x-auto'>
            <div className="p-8 ">
              <form>
                <div className='flex justify-between mb-4'>
                  <button
                    className="px-4 py-2 bg-blue-300 text-white rounded"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <div className='flex gap-2'>
                    <button
                      className="px-4 py-2 bg-blue-300 text-white rounded"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                    >
                      Previous
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-300 text-white rounded"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= files.length}
                    >
                      Next
                    </button>
                  </div>
                </div>
                {files.map((file, index) => (
                  <div key={index} className="mb-4">
                    {/* Aquí determinamos cómo renderizar cada tipo de archivo */}
                    {file?.endsWith('.pdf') ? (
                      // Renderizar PDF
                      <iframe src={`http://localhost:5001/${file}`} width="100%" height="500px" title={`PDF ${index}`} />
                    ) : file?.endsWith('.png') || file?.endsWith('.jpeg') || file?.endsWith('.jpg') ? (
                      // Renderizar imágenes (PNG, JPEG, JPG)
                      <img src={`http://localhost:5001/${file}`} alt={`Image ${index}`} />
                    ) : file?.endsWith('.svg') ? (
                      // Renderizar SVG
                      <object data={`http://localhost:5001/${file}`} type="image/svg+xml" width="100%" height="500px">
                        Your browser does not support SVG
                      </object>
                    ) : (
                      // Manejar otros tipos de archivo
                      <p>{`Unsupported file type: ${file.fileName}`}</p>
                    )}
                  </div>
                ))}
               </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfList;