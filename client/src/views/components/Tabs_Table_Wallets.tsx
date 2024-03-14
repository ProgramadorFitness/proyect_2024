import React, { useState } from 'react';
import { Wallet } from '../../models/models';
import Table_Wallets from './Table_Wallets';
import Api from '../../controllers/user.controller';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import { HashLoader } from 'react-spinners';


interface Props {
  data: Wallet[]
}

interface State {
  wallet: Wallet | null
  listWallet: Wallet[]
}


const Tabs_Table_Wallets = ({ data }: Props) => {

  const api = new Api()

  const [capital, setCapital] = useState("");
  const [loading, setLoading] = useState(false);
  const [numberWallet, setNumberWallet] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [state, setState] = useState<State>({
    wallet: null,
    listWallet: []
  })


  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "capital") {
      setCapital(value)
    }

    if (name === "numberWallet") {
      setNumberWallet(value)
    }

  }


  async function getWallets(id1: unknown) {
    const id = id1 as number
    const response = (await api.getWalletsjoin(id)).data
    setState({ wallet: null, listWallet: response })
  }

  async function deleteW(id5: unknown) {
    const confirmation = window.confirm('Are you sure you want to delete this wallet?')

    if(confirmation){
      try {
        const id = id5 as number
        const response2 = (await api.deleteWallet(id)).data
        alert('cartera eliminada con exito')
        location.reload()
      } catch (error) {
        alert('No se pudo eliminar la cartera')
      }
    }else{
      alert('action canceled')
    }
  }

  async function updateW(id6: unknown) {
    const id = id6 as number
    const response2 = (await api.getWalletsId(id)).data
    console.log(response2)

    setNumberWallet(response2['id'])
    setCapital(response2['capital'])
    
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(numberWallet)
      const response = await (await (api.updateWallet(numberWallet, capital))).data

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
    <div className='shadow-md sm:rounded-lg'>
      <div className='items-center  bg-slate-300 justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300'>
        <ul className="flex flex-wrap -mb-px ">
          {data?.map((item) => (
            <li key={item.id} className="me-2">
              <button type="button"
                className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-fuchsia-600 hover:border-gray-300 dark:hover:text-black-300"
                onClick={() => getWallets(item.id || null)}>Cartera #
                {item.id}
              </button>

              <table className='bg-slate-200 rounded'>
                <thead>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">CAPITAL</th>
                  <th scope="col" className="px-6 py-3">LOANS</th>
                  <th scope="col" className="px-6 py-3">ACTION</th>
                </thead>
                <tbody>
                  <tr key={item.id}></tr>
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.capital?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                  <td className="px-6 py-4">{item.loans}</td>
                  <td className=" flex">
                    <button onClick={() => deleteW(item.id || undefined)} className="bg-red-300 p-2 border-r-4" type="button">
                      <RiDeleteBin5Fill /></button>
                      <div>
                      <>
                      <button onClick={() => updateW(item.id || null)} className="bg-blue-300 p-2" type="button">
                        <FaEdit /></button>

                      { showModal ? (
                        <>
                          <div className=' p-8 fixed inset- bg-black bg-opacity-80 backdrop-blur-sm flex justify-center '>
                            <div className='bg-slate-400 rounded flex flex-col items-center gap-5 '>
                              <div className="p-8">
                                {loading && (
                                  <HashLoader loading={loading} size={50} color="#000000" />
                                )}
                                {!loading && (
                                  <form onSubmit={handleSubmit}>
                                    <div className="border-b border-gray-900/10  " >
                                      <h2 className=" text-center text-2xl font-semibold leading-7 text-gray-900">Add Wallet</h2>
                                    </div>
                                    <div className="sm:col-span-3">
                                      <label className="block text-sm font-medium leading-6 text-gray-900">Wallet number</label>
                                      <input disabled
                                        value={numberWallet}
                                        onChange={handleChange}
                                        type="text"
                                        name="numberWallet"
                                        id="numberWallet"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>

                                    <div className="sm:col-span-3">
                                      <label className="block text-sm font-medium leading-6 text-gray-900">Capital</label>
                                      <input
                                        value={capital}
                                        onChange={handleChange}
                                        type="text"
                                        name="capital"
                                        id="capital"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                          <Toaster position="top-right" />
                          </>
                           ) : null}
                    </>
                      </div>
                  </td>
                </tbody>
              </table>
            </li>
          ))}
        </ul>
        <div>
          <Table_Wallets data={state.listWallet} />
        </div>
      </div>
    </div>
  )
}

export default Tabs_Table_Wallets