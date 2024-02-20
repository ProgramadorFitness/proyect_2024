import { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import {  Wallet } from '../models/models'
import Api from '../controllers/user.controller';
import Tabs_Table_Wallets from '../components/Tabs_Table_Wallets';


type PropsRole={
  type: string | null;
}

interface State1 {
  wallet1: Wallet | null
  listWallet1: Wallet[]
}



export const Wallets = ({type}: PropsRole) => {
    
  /*const[state, setState] = useState<State>({
    wallet: null,
    listWallet:[]
})*/

const[state1, setState1] = useState<State1>({
  wallet1: null,
  listWallet1:[]
})

useEffect(() => {
  (async function getWallets() {
      const api = new Api()
      const response2 = (await api.getWallets()).data
      setState1({wallet1:null, listWallet1:response2})
      const lsit1 = response2
      //console.log(lsit1.length)

      /*const response = (await api.getWalletsjoin(lsit1.length)).data
      setState({wallet:null, listWallet:response})*/
  })();
},[]);

if(type == 'admin'|| type == 'supervisor')
{
  return (
    <DefaultLayout>
      <div className='pt-6 '>
      <Tabs_Table_Wallets data={state1.listWallet1}/>
      </div>
    </DefaultLayout>  )
}else{
  return(
    <DefaultLayout>
      <div className='py-8' >
        No tiene permisos para este modulo
      </div>
    </DefaultLayout>
  )
}
}

export default Wallets