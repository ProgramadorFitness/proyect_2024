import ReactPaginate from "react-paginate"
import { Collector } from "../../models/models"
import Modal_Add_Users from "./Modal_Add_User"
import Modal_Signup from "./Modal_Signup"
import React, { useEffect, useRef, useState } from "react"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaCashRegister, FaEdit, FaFileCsv, FaFileExcel, FaFilePdf, FaHandHolding, FaHandHoldingUsd } from 'react-icons/fa';
import Api from "../../controllers/user.controller"
import toast, { Toaster } from "react-hot-toast"
import { HashLoader } from "react-spinners"
import { RiDeleteBin5Fill } from "react-icons/ri"


interface Props {
    data: Collector[]
}

interface State {
    client: Collector | null
    listClient: Collector[]
}
const Table_User = ({ data }: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage: number = 10;
    const [showModal, setShowModal] = React.useState(false)
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
    const [identification, setIdent] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false);
    let result: Collector[] = [];
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
            const customHeaders = ['ID', 'NAME', 'ID_NUMBER', 'ADDRESS', 'PHONE', 'PHONE', 'STATE', 'GENRE', 'CITY', 'NEIGHBORHOOD'];
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

    function handleChange(e: React.ChangeEvent) {
        const { name, value } = e.target as HTMLInputElement;

        if (name === "identification") {
            setIdent(value)
        }

        if (name === "name") {
            setName(value)
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

    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGenre(value)
    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const api = new Api();
            const response = await (await (api.updateCollector(id, identification,
                name,
                lastName,
                address,
                genre,
                email,
                city,
                neigt,
                phone,
                phone2,
                state1))).data

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

    async function getUserIdent(id1: unknown) {
        const api = new Api()
        const id = id1 as number

        const response = (await api.getUserIdent(id)).data
        console.log('hola')


        //console.log(String(data1?.map((item)=>(item.name))))

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

        setShowModal(true)

    }
    useEffect(() => { getUserIdent(id) }, []);

    const searcher = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(e.target.value)
    }

    async function deleteUser(id:unknown){
            const confirmation = window.confirm('Are you sure you want to delete this loan?')
    
            if (confirmation) {
                try {
                    const api = new Api();
                    const response = await (await (api.deleteUser(String(id)))).data
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

    if (!search) {
        result = data
    } else {
        result = data.filter((dato) => {
            const matchByName = dato.name?.toLowerCase().includes(search.toLocaleLowerCase())

            const matchById_number = dato.id_number?.toString().includes(search.toLocaleString())

            const matchById = dato.id?.toString().includes(search.toLocaleString())

            const matchByPhone = dato.phone?.toLowerCase().includes(search.toLocaleLowerCase())

            return matchByName || matchById || matchByPhone || matchById_number
        })
    }
    return (
        <div className='shadow-md sm:rounded-lg'>
            <div className='flex w-full justify-center items-center text-black bg-slate-300 hover:bg-v focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-500 dark:focus:ring-slate-500'>
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
                <div className='pl-3'>
                    <Modal_Signup />
                </div>
                <div className='pl-3'>
                    <Modal_Add_Users />
                </div>
                <div className="flex ps-5 py-4 justify-center items-center w-full">
                    <div className='w-9 text-end bg-slate-400 rounded-s-lg h-9'>
                        <svg className="text-black-500  text-center dark:text-black-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input className=' bg-slate-200 rounded-r-lg w-full py-1.5 p' type="text" value={search} onChange={searcher} placeholder='Search...' />
                </div>
            </div>
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
                        <th scope="col" className="px-6 py-3">GENRE</th>
                        <th scope="col" className="px-6 py-3">CITY</th>
                        <th scope="col" className="px-6 py-3">NEIGHBORHOOD</th>
                        <th scope="col" className="px-6 py-3">ACTION</th>
                    </thead>
                    <tbody className="text-xs text-black-300 uppercase bg-slate-300 dark:bg-slate-200 dark:text-black-400">
                        {result?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item) => (
                            <tr key={item.id}>

                                <td className="px-6 py-4">{item.id}</td>

                                <th scope='row' className='flex items-center px-6 py-4 text-slate-800 whitespace-nowrap dark:text-black'>
                                    <div className="ps-3">
                                        <td className="text-base font-semibold">{item.name}</td>
                                        <td className="text-base font-semibold">{item.lastName}</td>
                                        <div className="font-normal text-gray-500">{item.email}</div>
                                    </div>
                                </th>
                                <td className="border-b border-slate-400 px-6 py-4">{item.id_number}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.address}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.phone}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.phone2}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.state}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.genre}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.city}</td>
                                <td className="border-b border-slate-400 px-6 py-4">{item.neighborhood}</td>
                                <td className="border-b border-slate-400 px-6 py-4 flex">
                                    <>
                                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button"
                                            onClick={() => getUserIdent(item.id || null)}
                                        >
                                            Edit <FaEdit size={25} className="h-8" />
                                        </button>

                                        {showModal ? (
                                            <>
                                                <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center'>
                                                    <div className='bg-slate-400  rounded flex flex-col items-center gap-5 '>
                                                        <div className="p-8">
                                                            {loading && (
                                                                <HashLoader loading={loading} size={50} color="#000000" />
                                                            )}
                                                            {!loading && (
                                                                <form onSubmit={handleSubmit}>
                                                                    <div className="border-b border-gray-900/10  " >
                                                                        <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                                                    </div>
                                                                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                        <div className="sm:col-span-3">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                                                            <input
                                                                                value={name}
                                                                                onChange={handleChange}
                                                                                type="text"
                                                                                name="name"
                                                                                id="name"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                        <div className="sm:col-span-3">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                                                            <input value={lastName}
                                                                                onChange={handleChange}
                                                                                type="text"
                                                                                name="lastName"
                                                                                id="lastName"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                        <div className="sm:col-span-3">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                                            <input value={email}
                                                                                onChange={handleChange}
                                                                                id="email"
                                                                                name="email"
                                                                                type="email"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>
                                                                        <div className="sm:col-span-3">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Genre</label>
                                                                            <select
                                                                                onChange={handleSelectChange}
                                                                                id="genre"
                                                                                name="genre"
                                                                                //value={genre}  
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                                <option >Select</option>
                                                                                <option value="Male">Male</option>
                                                                                <option value="Female">Female</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-span-full">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                                                                            <input
                                                                                value={address}
                                                                                onChange={handleChange}
                                                                                type="text"
                                                                                name="address"
                                                                                id="address"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                        <div className="sm:col-span-2 sm:col-start-1">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                                                            <input
                                                                                value={city}
                                                                                onChange={handleChange}
                                                                                type="text"
                                                                                name="city"
                                                                                id="city"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                        <div className="sm:col-span-2">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Neighborhood</label>
                                                                            <input
                                                                                value={neigt}
                                                                                onChange={handleChange}
                                                                                type='text'
                                                                                name="neigt"
                                                                                id="neigt"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                        <div className="sm:col-span-2">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                                                            <input
                                                                                value={phone}
                                                                                onChange={handleChange}
                                                                                type="number"
                                                                                name="phone"
                                                                                id="phone"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                        <div className="sm:col-span-2">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Phone #2</label>
                                                                            <input
                                                                                value={phone2}
                                                                                onChange={handleChange}
                                                                                type="number"
                                                                                name="phone2"
                                                                                id="phone2"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                        <div className="sm:col-span-2">
                                                                            <label className="block text-sm font-medium leading-6 text-gray-900">Identification</label>
                                                                            <input
                                                                                value={identification}
                                                                                onChange={handleChange}
                                                                                type="number"
                                                                                name="identification"
                                                                                id="identification"
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                        </div>

                                                                    </div>
                                                                    <div className='pt-6 sm:col-span-3 flex'>
                                                                        <div className=''>
                                                                            <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                                                                                onClick={() => setShowModal(false)}
                                                                            >Cancel</button>
                                                                        </div>
                                                                        <div className='px-8'>
                                                                            <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
                                                                            >Save</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Toaster position="top-right" />
                                            </>
                                        ) : null}
                                    </>
                                    <button onClick={()=>deleteUser(item.id)||null} className="border-x-4 border-slate-500  font-medium text-red-800 dark:red-blue-800 hover:underline" >
                                    <RiDeleteBin5Fill size={25} /> 
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
    )
}


export default Table_User

