import React, { useEffect, useRef, useState } from 'react';
import { Client, Loan, Wallet } from '../../models/models';
import Api from '../../controllers/user.controller';
import { FaCashRegister, FaEdit, FaFileCsv, FaFileExcel, FaFilePdf, FaHandHolding, FaHandHoldingUsd } from 'react-icons/fa';
import Table_Payments from './Table_Payments';
import Payments from '../Payments';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Modal_Loan from './Modal_Loan';
import ReactPaginate from 'react-paginate';
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RiDeleteBin5Fill } from 'react-icons/ri';


interface Props {
    data: Loan[]
}

interface State {
    client: Client | null
    listClient: Client[]
}
interface State1 {
    wallet1: Wallet | null
    listWallet1: Wallet[]
}



const Table_Loan = ({ data }: Props) => {

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
    const [state1, setState1] = useState("activo")
    const [wallet, setWallet] = useState<string>("")
    const [id_wallet, set_Wallet] = useState("")
    const [collector, setCollector] = useState("")
    const [id_client, setIdClient] = useState("")
    const [paymentF, setPaymentF] = useState("")
    const [startDate, setStart] = useState("")
    const [finishDate, setFinish] = useState("")
    const [dues, setDues] = useState("")
    const [duesValue, setDuesValue] = useState("")
    const [pay, setPay] = useState("")
    const [observation, setObser] = useState("")
    const [datePay, setDatepay] = useState("")
    const [duesPay, setDuespay] = useState("")
    const goTo = useNavigate();
    const componentPDF = useRef();
    const [loading, setLoading] = useState(false);
    let result: Loan[] = [];
    const [search, setSearch] = useState("")
    const [stateW, setStateW] = useState<State1>({
        wallet1: null,
        listWallet1: []
    })
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('inactivo');



    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage: number = 10;

    const [identification, setIdent] = useState("")
    const [file, setFile] = useState(null)
    const [data1, setData1] = useState<Client[]>()


    const [state, setState] = useState<State>({
        client: null,
        listClient: []
    })



    function redirect(id_loan: unknown) {
        goTo("/payment")

        localStorage.setItem("id_loan_temp", String(id_loan))
        console.log(id_loan)
    }

    useEffect(() => {
        getStateCheck()
    })


    async function getStateCheck() {

        data.forEach((item) => {
            if (item.state.toLowerCase() === 'activo') {
                setIsActive(true)
            }else{
                setIsActive(false)
            }
        });
    }


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

    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGenre(value)
    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const pay1 = +pay
        const duesPay1 = +duesPay

        try {
            const api = new Api();
            const response = await (await (api.updateState2(
                id,
                state1))).data
            // console.log(response)


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

        const response = (await api.getLoansId(id)).data


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
        setDues(response['dues'])
        setPaymentF(response['paymentF'])
        setStart(response['startLoan'])
        setFinish(response['finishLoan'])
        setValueEnd(response['value_end'])
        setValueInicial(response['value_initial'])
        setInterest(response['interest'])
        setDuespay(response['duesPay'] + 1)
        setState1(response['state'])

        setShowModal(true)

    }
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
            const customHeaders = [
                'ID'
                , 'ID_WALLET'
                , 'NAME'
                , 'ID_NUMBER'
                , 'ADDRESS'
                , 'PHONE'
                , 'PHONE #2'
                , 'STATE'
                , 'VALUE INITIAL'
                , 'VALUE END'
                , 'INTEREST'
                , 'PAYMENT FREQUENCY'
                , 'START LOAN'
                , 'FINISH LOAN'
                , 'DUES'
                , 'DUES VALUE'];
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
            autoTable(pdf, {
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
    async function deleteLoan(id: unknown) {
        const confirmation = window.confirm('Are you sure you want to delete this loan?')

        if (confirmation) {
            try {
                const api = new Api();
                const response = await (await (api.deleteLoan(String(id)))).data
                // console.log(response)


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
        } else {
            alert('action canceled')
        }
    }



    const handleCheckboxChange2 = async (itemId: string, newState: string) => {

        if(newState.toLocaleLowerCase() === 'activo'){
            setIsOpen(true);
        }else{
            setIsOpen(false);
        }
        
        setStatus(isOpen ? 'inactivo' : 'activo');
        const api = new Api()
        try {
            const response = await api.updateStateLoan(itemId, newState);
            console.log('Estado actualizado en la base de datos:', response.data);
        } catch (error) {
            console.error('Error al actualizar el estado en la base de datos:', error);
        }
    };

    const searcher = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(e.target.value)
    }

    if (!search) {
        result = data
    } else {
        result = data.filter((dato) => {
            const matchByState = dato.state?.toLowerCase().includes(search.toLocaleLowerCase())

            const matchByFq = dato.paymentF?.toLowerCase().includes(search.toLocaleLowerCase())

            const matchById_number = dato.id_number?.toString().includes(search.toLocaleString())

            const matchById = dato.id?.toString().includes(search.toLocaleString())

            const matchByName = dato.name?.toLowerCase().includes(search.toLocaleLowerCase())

            return matchById || matchById_number || matchByName || matchByFq || matchByState
        })
    }

    return (
        <div className='shadow-md sm:rounded-lg justify-center'>
            <th scope="col" className=" flex justify-center items-center text-black bg-slate-300 hover:bg-v focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-500 dark:focus:ring-slate-500">
                <Modal_Loan />
                <div className='pl-3'>
                    <button onClick={generateCSV}
                        className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
                    ><FaFileCsv size={25} /></button>
                </div>
                <div className='pl-3'>
                    <button onClick={exportToExcel}
                        className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
                    ><FaFileExcel size={25} /></button>
                </div>
                <div className='pl-3'>
                    <button onClick={exportToPDF}
                        className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
                    ><FaFilePdf size={25} /></button>
                </div>
                <div className="flex ps-5 py-4 justify-center items-center w-full">
                    <div className='w-9 text-end bg-slate-400 rounded-s-lg h-9'>
                        <svg className="text-black-500  text-center dark:text-black-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input className=' bg-slate-200 rounded-r-lg w-full py-1.5 p' type="text" value={search} onChange={searcher} placeholder='Search...' />
                </div>
            </th>
            <div className='overflow-auto bg-slate-300 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300 '>
                <table id='miTabla' className=" w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400 ">
                    <thead className="text-xs text-black-300 uppercase bg-gray-500 dark:bg-gray-500 dark:text-black-400">

                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">ID_WALLET</th>
                        <th scope="col" className="px-6 py-3">NAME</th>
                        <th scope="col" className="px-6 py-3">ID_NUMBER</th>
                        <th scope="col" className="px-6 py-3">ADDRESS</th>
                        <th scope="col" className="px-6 py-3">PHONE</th>
                        <th scope="col" className="px-6 py-3">PHONE #2</th>
                        <th scope="col" className="px-6 py-3">STATE</th>
                        <th scope="col" className="px-6 py-3">VALUE INITIAL</th>
                        <th scope="col" className="px-6 py-3">VALUE END</th>
                        <th scope="col" className="px-6 py-3">INTEREST</th>
                        <th scope="col" className="px-6 py-3">PAYMENT FREQUENCY</th>
                        <th scope="col" className="px-6 py-3">START LOAN</th>
                        <th scope="col" className="px-6 py-3">FINISH LOAN</th>
                        <th scope="col" className="px-6 py-3">DUES</th>
                        <th scope="col" className="px-6 py-3">DUES VALUE</th>
                        <th scope="col" className="px-6 py-3">ACTION</th>

                    </thead>
                    <tbody className="text-xs text-black-300 uppercase bg-slate-300 dark:bg-slate-200 dark:text-black-400">
                        {result?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item) => (
                            <tr key={item.id}>

                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.id_wallet}</td>

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
                                <td className="border-b border-slate-400 px-6 py-4 ">
                                    <div className=''>
                                        <label className="inline-flex items-center cursor-pointer static">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={isActive}

                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-500">{item.state}</span>
                                    </label>
                                    </div>
                                </td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.value_initial?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.value_end?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.interest}%</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.paymentF}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.startLoan?.substring(0, 10)}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.finishLoan?.substring(0, 10)}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.dues}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.duesValue?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td className="border-b border-slate-400 px-6 py-4 flex">
                                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button"
                                        //onClick={() => getClientsIdent(item.id || null)}
                                        onClick={() => redirect(item.id || null)}
                                    >
                                        Pay <FaHandHolding size={25} className="h-8" />
                                    </button>

                                    <button onClick={() => deleteLoan(item.id) || null} className="border-x-4 border-slate-500  font-medium text-red-800 dark:red-blue-800 hover:underline" >
                                        <RiDeleteBin5Fill size={25} />
                                    </button>
                                    <>
                                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                            className="font-medium text-blue-800 dark:text-blue-800 hover:underline" type="button"
                                            onClick={() => getClientsIdent(item.id || null)}
                                        //onClick={() => redirect(item.id || null)}
                                        >
                                            Edit <FaEdit size={25} className="h-8" />
                                        </button>

                                        {showModal ? (
                                            <>
                                                <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center  '>
                                                    <div className='bg-slate-400  rounded flex flex-col items-center gap-5 '>
                                                        <div className="p-8">
                                                            {loading && (
                                                                <HashLoader loading={loading} size={50} color="#000000" />
                                                            )}
                                                            {!loading && (
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

                                                                        <div className="sm:col-span-1">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">STATE</label>

                                                                            <label className="inline-flex items-center cursor-pointer">
                                                                                <button 
                                                                                    type="button"
                                                                                    //className="sr-only peer"
                                                                                    //checked={newisActive}
                                                                                    onClick={()=>handleCheckboxChange2(String(item.id), String(item.state))}
                                                                                />
                                                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                                            </label>
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
                                                                    </div >
                                                                    <div className='pt-6 sm:col-span-3 flex  mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t'>
                                                                        <div className='px-8'>
                                                                            <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400" type="button"
                                                                                onClick={handleSubmit}
                                                                            >Save</button>
                                                                        </div>
                                                                        <div className=''>
                                                                            <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                                                                                onClick={() => setShowModal(false)}
                                                                            >Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                        <Toaster position="top-right" />
                                    </>
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
    )
}

export default Table_Loan