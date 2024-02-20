import React, { useEffect, useState } from 'react'
import Api from '../controllers/user.controller';
import { Wallet } from '../models/models';
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";
import { GiWallet } from "react-icons/gi";
interface State {
    wallet: Wallet | null
    listWallet: Wallet[]
  }

const Modal_Add_Wallet = () => {
    const [modal, setModal] = useState(false);
    const [capital, setCapital] = useState("");
    const [numberWallet, setNumberWallet] = useState("");
    const [loading, setLoading] = useState(false);
    const typeUser = localStorage.getItem('typeUser');




    function  handleChange(e: React.ChangeEvent) {
        const { name, value } = e.target as HTMLInputElement;

        if (name === "numberWallet") {
            setNumberWallet(value)
          }

        if (name === "capital") {
            setCapital(value)
        }
    
      }

      useEffect(() => {
        (async function getWallet() {
            const api = new Api();
            const response = await (await (api.getWallets())).data
            console.log(response?.length)

            const walletCurrently = String(response?.length);

            setNumberWallet(String(+walletCurrently + 1))
            //console.log(numberWallet)
        })();
    },[]);
    
   

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
            
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const api = new Api();
            const response = await (await (api.postWallets(capital))).status

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

        if(typeUser == 'admin'){
            return (
                <>
                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button" onClick={() => setModal(true)}>
                    <GiWallet size={25}/>
            
                    </button>
            
                    { modal ? ( 
                        <>
                    <div className=' p-8 fixed inset- bg-black bg-opacity-80 backdrop-blur-sm flex justify-center '>
                        <div className='bg-slate-400  rounded flex flex-col items-center gap-5 '>
                            <div className="p-8">
                            {loading && (
                            <HashLoader loading={loading} size={50} color="#000000" />
                            )}
                            { !loading && (
                            <form >
                                <div className="border-b border-gray-900/10  " >
                                    <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Add Wallet</h2>
                                </div>
                                <div className="sm:col-span-3">
                                    <label  className="block text-sm font-medium leading-6 text-gray-900">Wallet number</label>
                                        <input disabled
                                        value={numberWallet}
                                        onChange={handleChange} 
                                        type="text" 
                                        name="numberWallet" 
                                        id="numberWallet"  
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
            
                                <div className="sm:col-span-3">
                                    <label  className="block text-sm font-medium leading-6 text-gray-900">Capital</label>
                                        <input
                                        value={capital}
                                        onChange={handleChange} 
                                        type="text" 
                                        name="capital" 
                                        id="capital"  
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                <div className='pt-6 sm:col-span-3 flex'> 
                                    <div className=''>
                                        <button className="  px-8 block text-black bg-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400" type="button"
                                        onClick={() => setModal(false)}
                                        >Cancel</button>
                                    </div>
                                    <div className='px-8'>
                                        <button className="  px-8 block text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400" 
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
                    ): null
                    }
                </>
              )
            }else{
                {toast.error('you do not have the necessary permissions')}
            }
            
        }
  
export default Modal_Add_Wallet
