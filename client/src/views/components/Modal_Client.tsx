import React, { useState } from 'react';
import { Client } from '../../models/models';
import Api from '../../controllers/user.controller';
import { FaUserPlus } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
interface State {
    client: Client | null
    listClient: Client[]
  }
  
  interface Props {
    data: Client[] 
  }

  

const Modal_Client = () => {
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
    const[file, setFile] = useState(null)
    const [loading, setLoading] = useState(false);


    
    const [data, setData] = useState<Client[]>()

    const[state, setState] = useState<State>({
      client: null,
      listClient:[]
  })


  function  handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "identification") {
      setId(value)
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
    const {name, value} = e.target;
    if(name == 'genre'){
    setGenre(value)
    }
    console.log(genre)
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        const api = new Api();
        const response = await (await (api.postClient(id,
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



  return (
    <>
    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
    onClick={() => setShowModal(true)}
    >
        <FaUserPlus size={25}/>
    </button>

    {showModal ? (
        <>
        <div className='p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center  overflow-y-auto'>
            <div className='bg-slate-400  rounded flex flex-col items-center gap-5 overflow-y-auto '>
                <div className="p-8">
                {loading && (
                <HashLoader loading={loading} size={50} color="#000000" />
                )}
                { !loading && (
                <form onSubmit={handleSubmit}>
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
                            value={id}
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
                            <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
                            
                            >Save</button>
                        </div>
                    </div>
                </form>
                )}
                </div>
            </div>
        </div>
        <Toaster position="top-right"/>
        </>
    ): null}
    </>
    )
}

export default Modal_Client