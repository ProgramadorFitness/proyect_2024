import React, { useState } from 'react'

const Modal_Add_Wallet = () => {
    const [modal, setModal] = useState(false)
  return (
    <>
        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button" onClick={()=>setModal(true)}>
        Add Wallet

        </button>

        { modal ? (
            <>
        <div className=' p-8 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center overflow-y-auto '>
            <div className='bg-slate-400  rounded flex flex-col items-center gap-5 overflow-y-auto'>
                <div className="p-8">
                <form >
                    
                </form>
                </div>
            </div>
        </div>
            </>

        ): null
        }
    </>
  )
}

export default Modal_Add_Wallet
