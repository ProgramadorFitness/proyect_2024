import { FaFilePdf } from "react-icons/fa";
import {  Wallet } from "../models/models";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

interface Props {
    data: Wallet[]
}



const Table_Wallets = ({data}: Props) => {

    const componentPDF = useRef();

    

    const generatePdf = useReactToPrint({
        content: () => componentPDF.current || null,
        documentTitle: "TablaClient",
        onAfterPrint:() => alert("Data save in PDF")
      });
    
  return (

    <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <th scope="col" className="px-6 py-3  text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-400 dark:hover:bg-slate-600 dark:focus:ring-slate-900">
                    <button onClick={generatePdf}><FaFilePdf/>Generar PDF</button>
                </th>
        <div ref={ componentPDF} style={{width:'100%', height:'100%'}}className='flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300 overflow-y-auto'>
        <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400">
            <thead className="text-xs text-black-300 uppercase bg-gray-50 dark:bg-gray-500 dark:text-black-400 ">
                <th>
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="sr-only">checkbox</label>
                    </div>
                </th>
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
                <th scope="col" className="px-6 py-3">PAYMENT FREQUENCY</th>
                <th scope="col" className="px-6 py-3">START LOAN</th>
                <th scope="col" className="px-6 py-3">FINISH LOAN</th>
                <th scope="col" className="px-6 py-3">DUES</th>
                <th scope="col" className="px-6 py-3">DUES PAID</th>
                <th scope="col" className="px-6 py-3">DUES VALUE</th>
                <th scope="col" className="px-6 py-3">ACTION</th>
            </thead>
            <tbody>
            {data?.map((item) => (
                <tr key={item.id}>
                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label  className="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td className="px-6 py-4">{item.id}</td>

                    <th scope='row' className='flex items-center px-6 py-4 text-slate-800 whitespace-nowrap dark:text-black'>
                    <div className="ps-3">
                    <td className="text-base font-semibold">{item.name}</td>
                    <td className="text-base font-semibold">{item.lastName}</td>
                    <div className="font-normal text-gray-500">{item.email}</div>
                    </div>
                    </th>
                <td className="px-6 py-4">{item.id_number}</td>  
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.phone2}</td>
                <td className="px-6 py-4">{item.state}</td>
                <td className="px-6 py-4">{item.value_initial}</td>
                <td className="px-6 py-4">{item.value_end}</td>
                <td className="px-6 py-4">{item.interest}</td>
                <td className="px-6 py-4">{item.paymentF}</td>
                <td className="px-6 py-4">{item.startLoan?.substring(0,10)}</td>
                <td className="px-6 py-4">{item.finishLoan?.substring(0,10)}</td>
                <td className="px-6 py-4">{item.dues}</td>
                <td className="px-6 py-4">{item.duesPaid}</td>
                <td className="px-6 py-4">{item.duesValue}</td>
                <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit Loan</a>
                </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
  );
};

export default Table_Wallets;
