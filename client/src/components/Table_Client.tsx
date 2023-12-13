import React, { useEffect, useState } from 'react';
import { Client } from '../models/models';
import Api from '../controllers/user.controller';
import { FaEdit } from 'react-icons/fa';

interface Props {
    data: Client[]
}

interface State {
    client: Client | null
    listClient: Client[]
}



const Table_Client = ({data}: Props) => {

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
    const[file, setFile] = useState(null)
    const [data1, setData1] = useState<Client[]>()


    const[state, setState] = useState<State>({
        client: null,
        listClient:[]
    })

    
    function  handleChange(e: React.ChangeEvent) {
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
    
        if(name=="address"){
            setAddress(value)
        }
        if(name=="genre"){
            setGenre(value)
        }
        if(name=="email"){
            setEmail(value)
        }
        if(name=="neigt"){
            setNeigt(value)
        }
        if(name=="phone"){
            setPhone(value)
        }
        if(name=="phone2"){
            setPhone2(value)
        }
        if(name=="city"){
            setCity(value)
        }
    
      }
    
      const  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGenre(value)
      }
    
    
      async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    
        //console.log("hola")
        
        try {
            const api = new Api();
            const response = await (await (api.updateClients(id,identification,
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
           // console.log(response)
      
           
          } catch (error) {
            console.log(error);
          }
        }

                async function getClientsIdent (id1:unknown) {
                        const api = new Api()
                        const id = id1 as number

                            const response = (await api.getClientsId(id)).data
                            //console.log(response['id'])
                        
                        
                           //console.log(String(data1?.map((item)=>(item.name))))

                        
            
            
                      setName(response['name'])
                      setlastName(response['lastName'])
                      setAddress(response['address'])
                      setGenre (response['genre'])
                      setCity(response['city'])
                      setNeigt(response['neighborhood'])
                      setPhone(response['phone'])
                      setPhone2(response['phone2'])
                      setEmail(response['email'])
                      setIdent(response['id_number'])
                      setId(response['id'])

                      setShowModal(true)

                        }
                        useEffect(() => {getClientsIdent(id)},[]);


            

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300 overflow-y-auto'>
            <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400">
                <thead className="text-xs text-black-300 uppercase bg-gray-50 dark:bg-gray-500 dark:text-black-400">
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
                    <th scope="col" className="px-6 py-3">GENRE</th>
                    <th scope="col" className="px-6 py-3">CITY</th>
                    <th scope="col" className="px-6 py-3">NEIGHBORHOOD</th>
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
                    <td className="px-6 py-4">{item.genre}</td>
                    <td className="px-6 py-4">{item.city}</td>
                    <td className="px-6 py-4">{item.neighborhood}</td>
                    <>
    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" 
    className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="button"
    onClick={()=>getClientsIdent(item.id || null)}
    >
        Edit <FaEdit className="h-8"/> 
    </button>

    {showModal ? (
        <>
        <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center overflow-y-auto overflow-y-auto'>
            <div className='bg-slate-400  rounded flex flex-col items-center gap-5 overflow-y-auto'>
                <div className="p-8">
                <form >
                    <div className="border-b border-gray-900/10  " >
                        <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                            <input
                            value={name}
                            onChange={handleChange} 
                            type="text" 
                            name="name" 
                            id="name"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                            <input value={lastName}
                            onChange={handleChange}
                            type="text" 
                            name="lastName" 
                            id="lastName"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-3">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <input value={email}
                            onChange={handleChange}
                            id="email" 
                            name="email" 
                            type="email"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div className="sm:col-span-3">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Genre</label>
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
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                            <input 
                            value={address}
                            onChange={handleChange}
                            type="text" 
                            name="address" 
                            id="address" 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">City</label>
                            <input 
                            value={city}
                            onChange={handleChange}
                            type="text" 
                            name="city" 
                            id="city"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-2">
                        <label   className="block text-sm font-medium leading-6 text-gray-900">Neighborhood</label>
                            <input 
                            value={neigt}
                            onChange={handleChange}
                            type='text' 
                            name="neigt" 
                            id="neigt" 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-2">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                            <input 
                            value={phone}
                            onChange={handleChange}
                            type="number" 
                            name="phone" 
                            id="phone"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-2">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Phone #2</label>
                            <input 
                            value={phone2}
                            onChange={handleChange}
                            type="number" 
                            name="phone2" 
                            id="phone2"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-2">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Identification</label>
                            <input 
                            value={identification}
                            onChange={handleChange}
                            type="number" 
                            name="identification" 
                            id="identification"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                    </div>
                    <div className='pt-6 sm:col-span-3 flex'> 
                        <div className=''>
                            <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                            onClick={() => setShowModal(false)}
                            >Cancel</button>
                        </div>
                        <div className='px-8'>
                            <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400" type="button"
                            onClick={handleSubmit}
                            >Save</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
        
        </>
    ): null}
    </>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Table_Client