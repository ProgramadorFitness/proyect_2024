import React from 'react';
import { useState } from "react";
import { Collector } from '../../models/models';
import Api from '../../controllers/user.controller';
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import { MdAssignmentInd } from "react-icons/md";

interface State {
    collector: Collector | null
    listCollector: Collector[]
  }
  
  
  interface Props {
    data: Collector[]
  }


export default function Modal_Signup()  {
    const [showModal, setShowModal] = React.useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastname] = useState("");
    const [name_last, setAllname] = useState("")
    const [id, setId] = useState("")
    const [id_c, setId_C] = useState("")
    const [typeUser, setType] = useState("")
    const [loading, setLoading] = useState(false);



    const [data, setData] = useState<Collector[]>()

    const[state, setState] = useState<State>({
        collector: null,
        listCollector:[]
  })
    

    const [errorResponse, setErrorResponse] = useState("");

async function getCollectorsid() {
  const api = new Api()
  const response = (await api.getCollectorsid(id)).data
  setState({collector:null, listCollector:response})
  setData(state.listCollector)

  setId_C(String(data?.map((item)=>(item.id))))

  setName(String(data?.map((item)=>(item.name))))
  setLastname(String(data?.map((item)=>(item.lastName))))
  setAllname(name +" "+ lastName)

}

const  handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setType(value)
}
    
    
    function handleChange(e: React.ChangeEvent) {
        const { name, value } = e.target as HTMLInputElement;
        if (name === "username") {
          setUsername(value);
          console.log(username)
        }
        if (name === "identification") {
            setId(value);
          }
        if (name === "password") {
          setPassword(value);
          console.log(password)
        }
        if(name=="type"){
          setType(value)
      }

        
    getCollectorsid()
}



        
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
          await new Promise(resolve => setTimeout(resolve, 2000))

            const api = new Api();
            const response = await (await (api.postUser(id_c, username, password, typeUser))).data
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



     

    return (
      <>
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
      onClick={() => setShowModal(true)}
      >
          <MdAssignmentInd size={25}/>

      </button>
   
      {showModal ? (
          <>
       <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-slate-400  rounded flex flex-col items-center gap-5">
          <div className="p-8">
          {loading && (
                <HashLoader loading={loading} size={50} color="#000000" />
                )}
                { !loading && (
            <form
              className=" justify-items-center text-center">
              <div className="border-b border-gray-900/10  " >
                        <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900"> Assign User</h2>
                </div>
              {!!errorResponse && (
                <div className="errorMessage">{errorResponse}</div>
              )}
                <div className="sm:col-span-3">
                <label  className="block text-sm font-medium leading-6 text-gray-900">Identification</label>
                            <input 
                            onChange={handleChange}
                            value={id}
                            type="text" 
                            name="identification" 
                            id="identification" 
                            className="text-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"/>
                </div>

              <div className="sm:col-span-3">
              <label>{name_last}</label>
              </div>

              <div className="sm:col-span-3">
              <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <input
                className="text-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                type="text"
                value={username}
                onChange={handleChange}
                name="username"
              />
              </div>
              
                <div className="sm:col-span-3">
                <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <input
                className="text-center text-center  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
                </div>

                <div className="sm:col-span-3">
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                        <select 
                            onChange={handleSelectChange}
                            id="type" 
                            name="type"
                            //value={genre}  
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option >Select</option>
                            <option value="admin">Manager</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="collector">Collector</option>
                            </select>
                        </div>
              

                    <div className='pt-6 sm:col-span-3 flex'> 
                        <div className=''>
                            <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                            onClick={() => setShowModal(false)}
                            >Cancel</button>
                        </div>
                        <div className='px-8'>
                            <button 
                            className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400" type="button"
                            onClick={handleSubmit}
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


  

