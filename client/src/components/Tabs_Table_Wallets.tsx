import React, { useState } from 'react';
import { Wallet } from '../models/models';
import Table_Wallets from './Table_Wallets';
import Api from '../controllers/user.controller';


interface Props {
    data: Wallet[]
}

interface State {
    wallet: Wallet | null
    listWallet: Wallet[]
  }
  

const Tabs_Table_Wallets = ({data}: Props) => {

    const[state, setState] = useState<State>({
        wallet: null,
        listWallet:[]
    })


async function getWallets(id1:unknown ) {
          const api = new Api()
          const id = id1 as number
          const response = (await api.getWalletsjoin(id)).data
          setState({wallet:null, listWallet:response})
      }

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto'>
    <div className='flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black dark:bg-slate-300 overflow-y-auto'>
        <ul className="flex flex-wrap -mb-px">
            {data?.map((item) => (
                <li key={item.id} className="me-2">
                <button   type="button"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-black-300"
                onClick={()=> getWallets(item.id || null)}>Cartera #
                  {item.id}
                </button>
              </li>
            ))}
          </ul>
            <div className='py-8'>
             <Table_Wallets data={state.listWallet}/>
            </div>
          </div>
    </div>
  )
}

export default Tabs_Table_Wallets