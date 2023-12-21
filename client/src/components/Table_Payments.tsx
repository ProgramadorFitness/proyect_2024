import { Payment } from "../models/models";

interface Props {
  data: Payment[]
}

const Table_Payments = ({data}: Props) => {

    //console.log(number_Loan)
  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg'>
    <div className='flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300 overflow-y-auto'>
        <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400">
            <thead className="text-xs text-black-300 uppercase bg-gray-50 dark:bg-gray-500 dark:text-black-400 ">
                <th>
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="sr-only">checkbox</label>
                    </div>
                </th>
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
                <td className="px-6 py-4">{item.id_loan}</td>  
                <td className="px-6 py-4">{item.id_number}</td> 
                <td className="px-6 py-4">{item.state}</td>
                <td className="px-6 py-4">{item.paymentF}</td>
                <td className="px-6 py-4">{item.dues}</td>
                <td className="px-6 py-4">{item.duesPaid}</td>
                <td className="px-6 py-4">{item.duesValue}</td>
                <td className="px-6 py-4">{item.outBalance}</td>
                <td className="px-6 py-4">{item.realDatePay}</td>
                <td className="px-6 py-4">{item.datePay?.substring(0,10)}</td>
                <td className="px-6 py-4">{item.finishLoan?.substring(0,10)}</td>
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
export default Table_Payments