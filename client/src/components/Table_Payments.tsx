import { FaFileCsv, FaFileExcel, FaFilePdf, FaHandHolding, FaHandHoldingUsd } from "react-icons/fa";
import Api from "../controllers/user.controller";
import { Client, Payment } from "../models/models";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
/*import { CellConfig, TableConfig, jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";*/
import { PDFDownloadLink } from '@react-pdf/renderer';
import TablaPDF from "./Invoice";
import ReactPaginate from 'react-paginate';
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
  data: Payment[]
}

interface State {
    client: Client | null
    listClient: Client[]
}

const Table_Payments = ({data}: Props) => {
    const [showModal, setShowModal] = React.useState(false)
    const [valueInicial, setValueInicial] = useState("")
    const [valueEnd, setValueEnd] = useState("")
    const [interest, setInterest] = useState("")
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [lastName, setlastName] = useState("")
    const [address, setAddress] = useState("")
    const [genre, setGenre] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [neigt, setNeigt] = useState("")
    const [phone, setPhone] = useState("")
    const [phone2, setPhone2] = useState("")
    const [paymentF, setPaymentF] = useState("")
    const [startDate, setStart] = useState("")
    const [finishDate, setFinish] = useState("")
    const [dues, setDues] = useState("")
    const [duesValue, setDuesValue] = useState("")
    const [pay, setPay] = useState("")
    const [observation, setObser] = useState("")
    const [datePay, setDatepay] = useState("")
    const [duesPay, setDuespay] = useState("")
    const [outBalance, setOut] = useState(0)
    const [statePay, setStatePay] = useState("")
    const componentPDF = useRef();
    const [loading, setLoading] = useState(false);
    let result:Payment[] = [];
    const [search, setSearch] = useState("")



    const goTo = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage: number = 10; 

    const [identification, setIdent] = useState("")


    function handleChange(e: React.ChangeEvent) {
        const { name, value } = e.target as HTMLInputElement;

        if (name === "identification") {
            setIdent(value)
        }

        if (name === "name") {
            setName("value")
        }

        if (name === "lastName") {
            setlastName(value)
        }

        if (name == "address") {
            setAddress(value)
        }
        if (name == "genre") {
            setGenre(value)
        }
        if (name == "email") {
            setEmail(value)
        }
        if (name == "neigt") {
            setNeigt(value)
        }
        if (name == "phone") {
            setPhone(value)
        }
        if (name == "phone2") {
            setPhone2(value)
        }
        if (name == "city") {
            setCity(value)
        }
        if (name == "duesPay") {
            setDuespay(value)
        }
        if (name == "pay") {
            setPay(value)
        }
        if (name == "observation") {
            setObser(value)
        }
        if (name == "datePay") {
            setDatepay(value)
        }

        
        // Verify state
        if(pay == duesValue){
            setStatePay("pay")
        }else if(+pay < +duesValue){
            setStatePay("pay of part")
            //console.log(statePay)
        }

    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        if(name == "genre"){
            setGenre(value)
        }

        if(name == "datePay"){
            setDatepay(value)
        }
    }



    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();



        console.log(statePay)
        try {
            const api = new Api();
            const response = await (await (api.postPayments(
                id,
                pay,
                datePay,
                observation,
                outBalance,
                statePay
                ))).data 
                
    
                if (!loading) {
                    const id = toast.success('Successfully');
                    setTimeout(() => {
                        toast.dismiss(id); 
                        location.reload()
                    }, 2000); 
                    }
              } catch (error) {
                console.log(error);
                toast.error('Failed connection')
              }
              finally {
                // Detiene la carga después de la simulación
                setLoading(false);
              }
            }

    async function getClientsIdent(id1: unknown) {
        const api = new Api()
        const id = String(id1)
        console.log(id)
        
        const response = (await api.getPaymentId(id)).data
        console.log(response)

        setName(response['name'])
        setlastName(response['lastName'])
        setAddress(response['address'])
        setGenre(response['genre'])
        setCity(response['city'])
        setNeigt(response['neighborhood'])
        setPhone(response['phone'])
        setPhone2(response['phone2'])
        setEmail(response['email'])
        setIdent(response['id_number'])
        setId(response['id'])
        setDuesValue(response['duesValue'])
        setPay(response['duesValue'])
        setDues(response['dues'])
        setPaymentF(response['paymentF'])
        setStart(response['startLoan'])
        setFinish(response['finishLoan'])
        setValueEnd(response['value_end'])
        setValueInicial(response['value_initial'])
        setInterest(response['interest'])
        setDuespay(response['duesPaid'])

        setShowModal(true)

    }

    //const generateInvoicePDF = () => {
        const datosEjemplo = [
            {   id:String(id),
                pay:String(pay),
                datePay:String(datePay),
                observation:String(observation),
                outBalance:String(outBalance),
                statePay:String(statePay)}
          ];

          /*return (
            <div>
              <h1>Tabla en PDF</h1>
              <PDFDownloadLink document={<TablaPDF datos={datosEjemplo} />} fileName="tabla.pdf">
                {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar Tabla PDF')}
              </PDFDownloadLink>
            </div>
       );
    };*/

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
            const customHeaders = ['ID','NAME','ID_NUMBER','ADDRESS','PHONE','PHONE','STATE','GENRE','CITY','NEIGHBORHOOD'];
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

      function redirect (id_temp:unknown){
        goTo("/collection")
        
        localStorage.setItem("id_pay_temp", String(id_temp))
    }
    

    const searcher = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(e.target.value) 
      }

      if(!search){
        result = data
      }else{ 
        result = data.filter((dato) => {
            const matchByState =  dato.state?.toLowerCase().includes(search.toLocaleLowerCase())
        
            const matchByFq =  dato.paymentF?.toLowerCase().includes(search.toLocaleLowerCase())
        
            const matchById_number =  dato.id_number?.toString().includes(search.toLocaleString())
        
            const matchById =  dato.id?.toString().includes(search.toLocaleString())
            
            return  matchById ||  matchById_number  || matchByFq || matchByState
        })
    }
    
    return (
    <div className='shadow-md sm:rounded-lg'>
                    <th scope="col" className=" flex justify-center items-center text-black bg-slate-300 hover:bg-v focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-500 dark:focus:ring-slate-500">
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
         <div className='overflow-auto bg-slate-300 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300'>
            <table id='miTabla' className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400">
                <thead className="text-xs text-black-300 uppercase bg-gray-500 dark:bg-gray-500 dark:text-black-400">

                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">ID_LOAN</th>
                <th scope="col" className="px-6 py-3">ID_NUMBER</th>
                <th scope="col" className="px-6 py-3">STATE</th>
                <th scope="col" className="px-6 py-3">PAYMENT FREQUENCY</th>
                <th scope="col" className="px-6 py-3">DUES</th>
                <th scope="col" className="px-6 py-3">DUES NUMBER</th>
                <th scope="col" className="px-6 py-3">DUES VALUE</th>
                <th scope="col" className="px-6 py-3">REAL PAY</th>
                <th scope="col" className="px-6 py-3">OUTSTANDING BALANCE</th>
                <th scope="col" className="px-6 py-3">REAL DATE PAY</th>
                <th scope="col" className="px-6 py-3">DATE PAY</th>
                <th scope="col" className="px-6 py-3">ACTION</th>
            </thead>
            <tbody className="text-xs text-black-300 uppercase bg-slate-300 dark:bg-slate-200 dark:text-black-400">
            {result?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item) => (
                <tr key={item.id}>
  
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.id_loan}</td>  
                <td className="px-6 py-4">{item.id_number}</td> 
                <td className="px-6 py-4">{item.state}</td>
                <td className="px-6 py-4">{item.paymentF}</td>
                <td className="px-6 py-4">{item.dues}</td>
                <td className="px-6 py-4">{item.duesPaid}</td>
                <td className="px-6 py-4">{item.duesValue}</td>
                <td className="px-6 py-4">{item.duesRealPay}</td>
                <td className="px-6 py-4">{item.outBalance}</td>
                <td className="px-6 py-4">{item.realDatePay?.substring(0,10)}</td>
                <td className="px-6 py-4">{item.datePay?.substring(0,10)}</td>
                <td className="px-6 py-4 flex">
                <>
                                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button"
                                            onClick={() => getClientsIdent(item.id || null)}
                                        >
                                            Pay <FaHandHolding size={25} className="h-8" />
                                        </button>

                                        {showModal ? (
                                            <>
                                                <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center '>
                                                    <div className='bg-slate-400  rounded flex flex-col items-center gap-5 overflow-auto'>
                                                        <div className="p-8">
                                                        {loading && (
                                                                <HashLoader loading={loading} size={50} color="#000000" />
                                                                )}
                                                                { !loading && (
                                                                <form onSubmit={handleSubmit}>
                                                                <div className="border-b  " >
                                                                    <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                                                </div>
                                                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                                                        <input disabled
                                                                            value={name}
                                                                            onChange={handleChange}
                                                                            type="text"
                                                                            name="name"
                                                                            id="name"
                                                                            className="text-center block wfull- rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                                                        <input disabled
                                                                            value={lastName}
                                                                            onChange={handleChange}
                                                                            type="text"
                                                                            name="lastName"
                                                                            id="lastName"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span-1">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                                        <input disabled
                                                                            value={email}
                                                                            onChange={handleChange}
                                                                            id="email"
                                                                            name="email"
                                                                            type="email"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                    <div className="sm:col-span-1">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Genre</label>
                                                                        <select disabled
                                                                            onChange={handleSelectChange}
                                                                            id="genre"
                                                                            name="genre"
                                                                            value={genre}
                                                                            className="block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                            <option >Select</option>
                                                                            <option value="Male">Male</option>
                                                                            <option value="Female">Female</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="col-span-2">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                                                                        <input disabled
                                                                            value={address}
                                                                            onChange={handleChange}
                                                                            type="text"
                                                                            name="address"
                                                                            id="address"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span ">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                                                        <input disabled
                                                                            value={city}
                                                                            onChange={handleChange}
                                                                            type="text"
                                                                            name="city"
                                                                            id="city"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Neighborhood</label>
                                                                        <input disabled
                                                                            value={neigt}
                                                                            onChange={handleChange}
                                                                            type='text'
                                                                            name="neigt"
                                                                            id="neigt"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                                                        <input disabled
                                                                            value={phone}
                                                                            onChange={handleChange}
                                                                            type="number"
                                                                            name="phone"
                                                                            id="phone"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Phone #2</label>
                                                                        <input disabled
                                                                            value={phone2}
                                                                            onChange={handleChange}
                                                                            type="number"
                                                                            name="phone2"
                                                                            id="phone2"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span-2">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Identification</label>
                                                                        <input disabled
                                                                            value={identification}
                                                                            onChange={handleChange}
                                                                            type="number"
                                                                            name="identification"
                                                                            id="identification"
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                                <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>

                                                                </div>

                                                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t">
                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Value Initial</label>
                                                                        <input disabled
                                                                            type="number"
                                                                            name="value_initial"
                                                                            id="value_initial"
                                                                            onChange={handleChange}
                                                                            value={valueInicial}
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Interest</label>
                                                                        <input disabled
                                                                            type="number"
                                                                            name="interest"
                                                                            id="interest"
                                                                            onChange={handleChange}
                                                                            value={interest}
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div >
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Payment Frequency</label>
                                                                        <select id="paymentF" disabled
                                                                            value={paymentF}
                                                                            name="paymentF"
                                                                            onChange={handleSelectChange}
                                                                            className=" rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                            <option value="diario">DIARIO</option>
                                                                            <option value="semanal">SEMANAL</option>
                                                                            <option value="quincenal">QUINCENAL</option>
                                                                            <option value="mensual">MENSUAL</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Start Loan</label>
                                                                        <input disabled
                                                                            type="date"
                                                                            name="startDate"
                                                                            id="startDate"
                                                                            onChange={handleChange}
                                                                            value={startDate}
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Finish Loan</label>
                                                                        <input disabled
                                                                            type="date"
                                                                            name="finishDate"
                                                                            id="finishDate"
                                                                            onChange={handleChange}
                                                                            value={finishDate}
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Dues</label>
                                                                        <input disabled
                                                                            type="number"
                                                                            name="dues"
                                                                            id="dues"
                                                                            onChange={handleChange}
                                                                            value={dues}
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Dues Value</label>
                                                                        <input disabled
                                                                            type="number"
                                                                            name="duesValue"
                                                                            id="duesValue"
                                                                            onChange={handleChange}
                                                                            value={duesValue}
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>

                                                                    <div className="sm:col-span">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Value End</label>
                                                                        <input disabled
                                                                            type="number"
                                                                            name="value_end"
                                                                            id="value_end"
                                                                            onChange={handleChange}
                                                                            value={valueEnd}
                                                                            className="text-center block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div >
                                                                    <div className='border-l '>
                                                                    <div className=" px-8">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Dues Pay</label>
                                                                        <input disabled
                                                                            type="number"
                                                                            name="duesPay"
                                                                            id="duesPay"
                                                                            onChange={handleChange}
                                                                            value={duesPay}
                                                                            className="text-center block w-40 rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div >
                                                                    <div className="px-8">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Pay</label>
                                                                        <input 
                                                                            type="number"
                                                                            name="pay"
                                                                            id="pay"
                                                                            onChange={handleChange}
                                                                            value={pay}
                                                                            className="text-center block w-40 rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div >
                                                                    </div >
                                                                    <div className='flex'>
                                                                    <div className="px-8">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Observation</label>
                                                                        <textarea  
                                                                            //type="string"
                                                                            name="observation"
                                                                            id="observation"
                                                                            onChange={handleChange}
                                                                            value={observation}
                                                                            className="text-center block h-32 w-80 rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div >

                                                                    <div className="px-8">
                                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Date Pay</label>
                                                                        <input 
                                                                            type="date"
                                                                            name="datePay"
                                                                            id="datePay"
                                                                            onChange={handleChange}
                                                                            value={datePay}
                                                                            className=" text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div >
                                                                    </div>
                                                                </div>

                                                                <div className='pt-6 sm:col-span-3 flex  mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t'>
                                                                    <div className='px-8'>
                                                                        <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400" 
                                                                            
                                                                        >Save</button>
                                                                    </div>
                                                                    <div className=''>
                                                                        <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                                                                            onClick={() => setShowModal(false)}
                                                                        >Cancel</button>
                                                                    </div>

                                                                    <div className=''>
                                                                        <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                                                                        >
                                                                        <PDFDownloadLink document={<TablaPDF datos={datosEjemplo} />} fileName="tabla.pdf">
                                                                            {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar Tabla PDF')}
                                                                        </PDFDownloadLink>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                        <Toaster position="top-right"/>
                                    </>
                                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                            className="border-x-4 border-slate-500 pl-2 font-medium text-blue-800 dark:text-blue-800 hover:underline" type="button"
                                            onClick={() =>redirect(item.id_loan || null)}
                                        >
                                            Collect <FaHandHoldingUsd size={25} className="h-8" />
                                    </button>
                    </td>
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
export default Table_Payments