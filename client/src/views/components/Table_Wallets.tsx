import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";
import {  Wallet } from "../../models/models";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import Modal_Add_Wallet from "./Modal_Add_Wallet";
import ReactPaginate from "react-paginate";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
    data: Wallet[]
}



const Table_Wallets = ({data}: Props) => {

    const componentPDF = useRef(); 
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage: number = 10; 
    let result:Wallet[] = [];
    const [search, setSearch] = useState("")



    function generateCSV() {
        const element: HTMLTableElement | null = document.getElementById('miTabla');

        if (element) {
            // Obtener datos de la tabla
            const tableData: any[][] = [];
            const headers: string[] = [];
    
            // Obtener encabezados de la primera fila
            const headerRow = element.querySelector('thead tr');
            if (headerRow) {
                // Utilizar solo los elementos th que tienen contenido
                headerRow.querySelectorAll('th:not(:empty)').forEach((header) => {
                    headers.push(header.textContent || '');
                });
            }
    
            // Obtener datos de las filas de la tabla
            element.querySelectorAll('tbody tr').forEach((row) => {
                const rowData: any[] = [];
                row.querySelectorAll('td').forEach((cell) => {
                    rowData.push(cell.textContent || '');
                });
                tableData.push(rowData);
            });
    
            // Convertir datos a formato CSV
            const csvContent = [headers.join(','), ...tableData.map(row => row.join(','))].join('\n');
    
            // Crear un objeto Blob y generar un enlace para descargar el archivo
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
    
            if (link.download !== undefined) {
                // En navegadores que admiten la propiedad de descarga
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'archivo.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Fallback para navegadores que no admiten la propiedad de descarga
                window.open('data:text/csv;charset=utf-8,' + escape(csvContent));
            }
        } else {
            console.error('No se encontró la tabla con el ID "miTabla".');
        }
    }

    async function exportToPDF() {
        const pdf = new jsPDF({ orientation: 'landscape' });

        const element: HTMLElement | null = document.getElementById('miTabla');
    
        if (element) {
            // Obtener datos de la tabla HTML
            const tableData: any[][] = [];
            const headers: string[] = [];
    
            // Obtener encabezados de la primera fila
            const headerRow = element.querySelector('thead tr');
            if (headerRow) {
                headerRow.querySelectorAll('th').forEach((header) => {
                    headers.push(header.textContent || '');
                });
            }
    
            // Añadir encabezados personalizados
            const customHeaders = ['ID',
                'NAME',
                'ID_NUMBER',
                'ADDRESS',
                'PHONE',
                'PHONE #2',
                'STATE',
                'VALUE INITIAL',
                'VALUE END',
                'INTEREST'];
            headers.push(...customHeaders);
    
            // Obtener datos de las filas de la tabla
            element.querySelectorAll('tbody tr').forEach((row) => {
                const rowData: any[] = [];
                row.querySelectorAll('td').forEach((cell) => {
                    rowData.push(cell.textContent || '');
                });
    
                // Añadir datos personalizados
                rowData.push('Custom Data 1', 'Custom Data 2', 'Custom Data 3');
    
                tableData.push(rowData);
            });
    
            // Configuración de estilo para la tabla
            const styles = {
                headStyles: { fillColor: [200, 200, 200], textColor: 0, fontStyle: 'bold' },
                bodyStyles: { textColor: 0 },
                alternateRowStyles: { fillColor: [245, 245, 245] },
            };
    
            // Configuración de columnas
            const columns = headers.map(() => ({ auto: 'wrap' }));
    
            // Generar PDF con los datos obtenidos
            autoTable(pdf,{
                head: [headers],
                body: tableData,
                styles,
                columns,
            });
    
            pdf.save('archivo.pdf');
    
            // Convertir la tabla HTML a un libro de Excel
            const workbook = XLSX.utils.table_to_book(element);
    
            // Crear un Blob a partir del libro de Excel
            const blob = XLSX.write(workbook, {
                bookType: 'xlsx',
                bookSST: false,
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                type: 'blob',
            });
    
            // Convertir el Blob a Uint8Array
            const arrayBuffer = await new Response(blob).arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
    
            // Guardar el Uint8Array como archivo usando file-saver
            saveAs(new Blob([uint8Array], { type: blob.type }), 'archivo.xlsx');
        } else {
            console.error('No se encontró la tabla con el ID "miTabla".');
        }
    }
    async function exportToExcel() {
        // Obtener datos de la tabla HTML
        const table: HTMLTableElement | null = document.getElementById('miTabla') as HTMLTableElement;
    
        if (table) {
            try {
                // Convertir la tabla HTML a un libro de Excel
                const workbook = XLSX.utils.table_to_book(table);
    
                // Crear un Blob a partir del libro de Excel
                const blob = XLSX.write(workbook, {
                    bookType: 'xlsx',
                    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    type: 'array',
                });
    
                // Convertir el Blob a Uint8Array
                const arrayBuffer = await new Response(blob).arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
    
                // Guardar el Uint8Array como archivo usando file-saver
                saveAs(new Blob([uint8Array], { type: blob.type }), 'archivo.xlsx');
            } catch (error) {
                console.error('Error al exportar a Excel:', error);
            }
        } else {
            console.error('No se encontró la tabla con el ID "miTabla".');
        }
    }
    

    const searcher = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(e.target.value) 
      }

      if(!search){
        result = data
      }else{ 
        result = data.filter((dato) => {
        const matchByName =  dato.name?.toLowerCase().includes(search.toLocaleLowerCase())

        const matchById_number =  dato.id_number?.toString().includes(search.toLocaleString())

        const matchById =  dato.id?.toString().includes(search.toLocaleString())

        const matchByPhone =  dato.phone?.toLowerCase().includes(search.toLocaleLowerCase())

        return matchByName || matchById || matchByPhone || matchById_number
        })
    }
  return (

    <div className='shadow-md sm:rounded-lg w-full'>
                    <th scope="col" className=" flex justify-center items-center text-black bg-slate-300 hover:bg-v focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-500 dark:focus:ring-slate-500">
                    <Modal_Add_Wallet/>
                    <div className='pl-3'>
                    <button onClick={generateCSV}
                        className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
                    ><FaFileCsv size={25}/></button>
                </div>
                <div className='pl-3'>
                    <button onClick={exportToExcel}
                        className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
                    ><FaFileExcel size={25}/></button>
                </div>
                <div className='pl-3'>
                    <button onClick={exportToPDF}
                        className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
                    ><FaFilePdf size={25}/></button>
                </div>
                    <div className="flex ps-5 py-4 justify-center items-center w-full">
                    <div className='w-9 text-end bg-slate-400 rounded-s-lg h-9'>
                        <svg className="text-black-500  text-center dark:text-black-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input className=' bg-slate-200 rounded-r-lg w-full py-1.5 p' type="text" value={search} onChange={searcher} placeholder='Search...'/>
                </div>
                    </th>
            <div className='overflow-auto bg-slate-300 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300 '>
            <table id='miTabla' className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400">
        <thead className="text-xs text-black-300 uppercase bg-gray-500 dark:bg-gray-500 dark:text-black-400">

                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">NAME</th>
                <th scope="col" className="px-6 py-3">ID_NUMBER</th>
                <th scope="col" className="px-6 py-3">ADDRESS</th>
                <th scope="col" className="px-6 py-3">PHONE</th>
                <th scope="col" className="px-6 py-3">PHONE #2</th>
                <th scope="col" className="px-6 py-3">STATE</th>
                <th scope="col" className="px-6 py-3">VALUE INITIAL</th>
                <th scope="col" className="px-6 py-3">VALUE END</th>
                <th scope="col" className="px-6 py-3">INTEREST</th>
            </thead>
            <tbody className="uppercase">
            {result?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item) => (
                <tr key={item.id}>
       
                    <td className="px-6 py-4">{item.id}</td>

                    <th scope='row' className='flex items-center px-6 py-4 text-slate-800 whitespace-nowrap dark:text-black'>
                    <div className="ps-3">
                    <td className="border-b border-slate-400 text-base font-semibold">{item.name}</td>
                    <td className="border-b border-slate-400 text-base font-semibold">{item.lastName}</td>
                    <div className="font-normal text-gray-500">{item.email}</div>
                    </div>
                    </th>
                <td className="border-b border-slate-400 px-6 py-4">{item.id_number}</td>  
                <td className="border-b border-slate-400 px-6 py-4">{item.address}</td>
                <td className="border-b border-slate-400 px-6 py-4">{item.phone}</td>
                <td className="border-b border-slate-400 px-6 py-4">{item.phone2}</td>
                <td className="border-b border-slate-400 px-6 py-4">{item.state}</td>
                <td className="border-b border-slate-400 px-6 py-4">{item.value_initial?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td className="border-b border-slate-400 px-6 py-4">{item.value_end?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td className="border-b border-slate-400 px-6 py-4">{item.interest}%</td>
                
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    <ReactPaginate className=' flex justify-center items-center mt-4'
        previousLabel={'anterior'}
        nextLabel={'siguiente'}
        breakLabel={'...'}
        pageCount={Math.ceil((data?.length || 0) / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        //containerClassName={''} // Alineación central y margen superior
        activeClassName={'bg-gray-300 text-black'} // Color de fondo y texto para la página activa
        pageClassName={'mx-9'} // Margen horizontal entre páginas
        previousClassName={'border px-2 py-1 rounded-md bg-gray-500 text-black-900'} // Estilo del botón "anterior"
        nextClassName={'border px-2 py-1 rounded-md bg-gray-500 text-black-900'} // Estilo del botón "siguiente"
        />
</div>
  ); 
};

export default Table_Wallets;
