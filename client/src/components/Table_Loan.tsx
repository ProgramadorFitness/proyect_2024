import React, { useEffect, useState } from 'react';
import { Client, Loan } from '../models/models';
import Api from '../controllers/user.controller';
import { FaCashRegister, FaHandHoldingUsd } from 'react-icons/fa';
import Table_Payments from './Table_Payments';
import Payments from '../routes/Payments';
import { useNavigate } from 'react-router-dom';


interface Props {
    data: Loan[]
}

interface State {
    client: Client | null
    listClient: Client[]
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
  



    const [identification, setIdent] = useState("")
    const [file, setFile] = useState(null)
    const [data1, setData1] = useState<Client[]>()


    const [state, setState] = useState<State>({
        client: null,
        listClient: []
    })

    

    function redirect (id_loan:unknown){
        goTo("/payment")
        
        localStorage.setItem("id_loan_temp", String(id_loan))
        console.log(id_loan)
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
            const response = await (await (api.postPay(
                id,
                pay1,
                duesPay1,
                datePay,
                observation))).data
           // console.log(response)
      
           
          } catch (error) {
            console.log(error);
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
        setDuespay(response['duesPay']+1)

        setShowModal(true)

    }
    //useEffect(() => { getClientsIdent(id) }, []);

    return (
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <div className='flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300 overflow-y-auto'>
                <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400 ">
                    <thead className="text-xs text-black-300 uppercase bg-gray-50 dark:bg-gray-500 dark:text-black-400 overflow-y-auto">
                        <th>
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="sr-only">checkbox</label>
                            </div>
                        </th>
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
                        <th scope="col" className="px-6 py-3">DUES PAID</th>
                        <th scope="col" className="px-6 py-3">DUES VALUE</th>
                        <th scope="col" className="px-6 py-3">ACTION</th>

                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item.id}>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.id_wallet}</td>

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
                                <td className="px-6 py-4">{item.startLoan?.substring(0, 10)}</td>
                                <td className="px-6 py-4">{item.finishLoan?.substring(0, 10)}</td>
                                <td className="px-6 py-4">{item.dues}</td>
                                <td className="px-6 py-4">{item.duesPaid}</td>
                                <td className="px-6 py-4">{item.duesValue}</td>
                                <td className="px-6 py-4">
                                    <>
                                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button"
                                            //onClick={() => getClientsIdent(item.id || null)}
                                            onClick={() =>redirect(item.id || null)}
                                        >
                                            Pay <FaHandHoldingUsd className="h-8" />
                                        </button>

                                        {showModal ? (
                                            <>
                                                <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center  overflow-y-auto'>
                                                    <div className='bg-slate-400  rounded flex flex-col items-center gap-5  overflow-y-auto'>
                                                        <div className="p-8">
                                                            <form >
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

                                                                <div className='pt-6 sm:col-span-3 flex overflow-y-auto mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t'>
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table_Loan