import React from 'react';
import { useState } from "react";


export default function Modal_Signup()  {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    

    const [errorResponse, setErrorResponse] = useState("");


    async function handleSubmit(e: React.FormEvent<HTMLFormElement> ){
        e.preventDefault();

        
    }


     const [showModal, setShowModal] = React.useState(false)

    return (
      <>
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
      onClick={() => setShowModal(true)}
      >
          Add Registration User
      </button>
  
      {showModal ? (
          <>
          <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center '>
               <div className='bg-slate-400  rounded flex flex-col items-center gap-5'>
                    <div className="p-8">

                    <form className="grid justify-items-center text-center" onSubmit={handleSubmit}>
                            <div className="border-b border-gray-900/10  ">
                            <h1 className=" font-semibold leading-7 text-gray-900 text-3xl">Login</h1>
                            </div>
                            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                            <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <input className="text-center mt-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>

                            <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <input className="text-center mt-6 text-center mt-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>

                            <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <input className="text-center mt-6 text-center mt-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>

                            <div className='pt-6  flex'>
                            <div className='px-8'>
                            <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400" type="button"
                           
                            >Save</button>
                            </div>
                            <div className='px-8'>
                            <button className="text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                             onClick={() => setShowModal(false)}>Cancel</button>
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


  

