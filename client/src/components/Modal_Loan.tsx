import React, { useEffect, useState } from 'react';
import { Client } from '../models/models';
import Api from '../controllers/user.controller';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface State {
  client: Client | null
  listClient: Client[]
}

interface Props {
  data: Client[]
}

const Modal_Loan = () => {

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
    const [wallet, setWallet] = useState("")
    const [id_wallet, set_Wallet] = useState("")
    const [collector, setCollector] = useState("")
    const [id_client, setIdClient] = useState("")
    const auth = useAuth();
    const goTo = useNavigate();

    const [data, setData] = useState<Client[]>()

    const[state, setState] = useState<State>({
      client: null,
      listClient:[]
  })

  

    function  handleChange(e: React.ChangeEvent) {
      const { name, value } = e.target as HTMLInputElement;
      if (name === "value_initial") {
        setValueInicial(value);
      }
      if (name === "interest") {
        setInterest(value);
      }
      
      if (name === "identification") {
        setId(value)
      }

      if (name === "name") {
        setName(value)
      }

      if (name === "wallet") {
        setWallet(value)
      }

      if(name=="collector"){
        setCollector(value)
      }

     
      getClients();
      
      const a  = +valueInicial;
      const b  = +interest;
      const result = ((b*a)/100)+a

      setValueEnd(result.toString())
    }

    useEffect(() => {},[]);
         
    
      async function getClients() {
          const api = new Api()
          const response = (await api.getClientsIdent(id)).data
          setState({client:null, listClient:response})
          setData(state.listClient)

          console.log(String(data?.map((item)=>(item.name))))

          setName(String(data?.map((item)=>(item.name))))
          setlastName(String(data?.map((item) =>(item.lastName))))
          setAddress(String(data?.map((item) =>(item.address))))
          setGenre (String(data?.map((item) =>(item.genre))))
          setCity(String(data?.map((item) =>(item.city))))
          setNeigt(String(data?.map((item) =>(item.neighborhood))))
          setPhone(String(data?.map((item) =>(item.phone))))
          setPhone2(String(data?.map((item) =>(item.phone2))))
          setEmail(String(data?.map((item) =>(item.email))))
          setIdClient(String(data?.map((item) =>(item.id))))

      }
        
    

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if(wallet=="CARTERA #1"){
        set_Wallet("1")
      }else{
        set_Wallet("2")
      }

      try {
        const api = new Api();
        const response = await (await (api.postLoans(id_client, valueInicial, valueEnd, interest, state1, id_wallet))).statusText
        console.log(response)
  
        if(response == 'OK'){
           auth.isAuthenticated = true
           goTo("/client");
        }
      } catch (error) {
        console.log(error);
      }
    }

    


  return (
    <>
    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
    onClick={() => setShowModal(true)}
    >
        Add Loan
    </button>

    {showModal ? (
        <>
        
        <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center overflow-y-auto overflow-x-auto'>
            <div className='bg-slate-400  rounded flex flex-col items-center gap-5 overflow-y-auto overflow-x-auto'>
                <div className="p-8 overflow-y-auto">
                
                <form onSubmit={handleSubmit}>
                    <div className="border-b  " >
                        <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Loan Information</h2>
                    </div>
                   
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Identification</label>
                            <input 
                            onChange={handleChange}
                            value={id}
                            type="text" 
                            name="identification" 
                            id="identification" 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div className="">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                            <input 
                            onChange={handleChange} 
                            value={name} 
                            type="text" 
                            name="name" 
                            id="name"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></input>
                        </div>

                        <div className="">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                            <input 
                            onChange={handleChange} 
                            value={lastName}
                            type="text" 
                            name="last-name" 
                            id="last-name"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <input 
                            onChange={handleChange} 
                            value={email}
                            id="email" 
                            name="email" 
                            type="email"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div className="">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Genre</label>
                            <select 
                            onChange={handleChange} 
                            value={genre}
                            id="genre" 
                            name="genre"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Male</option>
                            <option>Female</option>
                            </select>
                        </div>

                        <div className="">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                            <input 
                            onChange={handleChange} 
                            value={address}
                            type="text" 
                            name="street-address" 
                            id="street-address" 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">City</label>
                            <input 
                            onChange={handleChange} 
                            value={city}
                            type="text" 
                            name="city" 
                            id="city"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="">
                        <label   className="block text-sm font-medium leading-6 text-gray-900">Neighborhood</label>
                            <input 
                            onChange={handleChange} 
                            value={neigt}
                            type='text' 
                            name="neighborhood" 
                            id="neighborhood" 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                            <input 
                            onChange={handleChange} 
                            value={phone}
                            type="number" 
                            name="phone" 
                            id="phone"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Phone #2</label>
                            <input 
                            onChange={handleChange} 
                            value={phone2}
                            type="number" 
                            name="phone2" 
                            id="phone2"  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    
                    <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>

                    </div>
                    <div className=" border-t sm:col-span flex items-center " >
                      <div >
                      <label  className="block text-sm font-medium leading-6 text-gray-900">Wallet</label>
                            <select id="wallet" 
                            
                            name="wallet"  
                            
                            className=" rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>CARTERA #1</option>
                            <option>CARTERA #2</option>
                            </select>
                      </div>

                      <div className='px-6'>
                      <label  className="block text-sm font-medium leading-6 text-gray-900 ">Collector</label>
                            <select id="collector" 
                            name="collector"  
                            className=" rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>ANDRES PALACIOS</option>
                            <option>KEVIN VILLOTA</option>
                            </select>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-t">
                      <div className="sm:col-span">
                            <label  className="block text-sm font-medium leading-6 text-gray-900">Value Initial</label>
                            <input  
                            type="number"
                            name="value_initial" 
                            id="value_initial"  
                            onChange={handleChange}
                            value={valueInicial}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Interest</label>
                            <input 
                            type="number" 
                            name="interest" 
                            id="interest"
                            onChange={handleChange} 
                            value={interest} 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="sm:col-span">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Value End</label>
                            <input 
                            type="string" 
                            name="value_end" 
                            id="value_end" 
                            onChange={handleChange} 
                            value={valueEnd}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className='pt-6 sm:col-span-3 flex overflow-y-auto'> 
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
  )
}

export default Modal_Loan