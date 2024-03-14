import React, { useState } from 'react'
import Api from '../../controllers/user.controller'
import { Wallet } from '../../models/models'
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import { FaUserTie } from 'react-icons/fa';

interface State1 {
    wallet1: Wallet | null
    listWallet1: Wallet[]
  }

const Modal_Add_Users = () => {
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
    const [state1, setState1] = useState("activo")
    const [wallet, setWallet] = useState<string>("")
    const [loading, setLoading] = useState(false);


    const[stateW, setStateW] = useState<State1>({
        wallet1: null,
        listWallet1:[]
      })


    const  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
      
        if(name == "wallet"){
          setWallet(value)
        }
        if(name == 'genre'){
        setGenre(value)
        }
        console.log(genre)
      }


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
        if(name=="email"){
            setEmail(value)
        }
        if(name=="neigt"){
            setNeigt(value)
        }
        if(name=="phone"){
            setPhone(value)
        }
        if(name=="city"){
            setCity(value)
        }
        if(name == "wallet"){
            setWallet(value)
          }
    
      }

      async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        //console.log("hola")
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const api = new Api();
            const response = await (await (api.postCollector(id, wallet,
              name,
              lastName,
              address,
              genre,
              email,
              city,
              neigt,
              phone,
              state1))).data
            console.log(response)

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

        async function getWallets() {
            const api = new Api()
            const response = (await api.getWallets()).data
            setStateW({wallet1:null, listWallet1:response})

            setWallet(String(stateW.listWallet1?.map((item)=>(item.id))))
            console.log(wallet)


        }

        const openModal=()=>{
            setShowModal(true)
            getWallets();


        }


  return (
    <>
    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
    onClick={openModal}
    >
        <FaUserTie size={25} />

    </button>

    {showModal ? (
        <>
        <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center overflow-y-auto '>
            <div className='bg-slate-400  rounded flex flex-col items-center gap-5 overflow-y-auto'>
                <div className="p-8">
                {loading && (
                <HashLoader loading={loading} size={50} color="#000000" />
                )}
                { !loading && (
                <form onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10  " >
                        <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Add User</h2>
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
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
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Identification</label>
                            <input 
                            value={id}
                            onChange={handleChange}
                            type="number" 
                            name="identification" 
                            id="identification"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-1">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Wallet</label>
                            <select 
                                onChange={handleSelectChange}
                                id="wallet"
                                name="wallet" 
                                value={wallet}
                                className="block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option >Select</option>
                                {stateW.listWallet1?.map((item) => (<option value={item.id}>Cartera #{item.id} </option>))}
                            </select>
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
                            //onClick={handleSubmit}
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

export default Modal_Add_Users