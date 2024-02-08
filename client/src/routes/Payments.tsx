import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Table_Payments from '../components/Table_Payments'
import { Payment } from '../models/models'
import Api from '../controllers/user.controller'


interface State {
  payment: Payment | null
  listPayment: Payment[]
}
type PropsRole={
  type: string | null;
}

const Payments = ({type}: PropsRole) => {

  const[state, setState] = useState<State>({
    payment: null,
    listPayment:[]
})
  const [disabled, setDisable] = useState(false);

const id_loan = localStorage.getItem('id_loan_temp')
const typeUser = String(localStorage.getItem('typeUser'));
const idUser = String(localStorage.getItem('idUser'));
    console.log(id_loan)

    function ListAll (){
      localStorage.removeItem('id_loan_temp')
      location.reload()
    }

useEffect(() => {

  (async function getPayId() {
      const api = new Api()

      if(typeUser == 'client'){
        const response2 = (await api.getPaymentClient2(idUser)).data
        setState({payment:null, listPayment:response2})
        console.log(response2)
      }else if(typeUser == 'collector'){
        console.log('hola')
      }else{
        if(id_loan == null){
          const response2 = (await api.getPay()).data
          setState({payment:null, listPayment:response2})
          const lsit1 = response2
          console.log(lsit1)
        }else{
          const response2 = (await api.getPayId(String(id_loan))).data
          setState({payment:null, listPayment:response2})
        const lsit1 = response2
        }

      }
  })();
},[]);


if(type == 'admin' || type == 'client' || type == 'supervisor' || type == 'collector')
{

  return (
    <DefaultLayout>
      <div className='pt-6'>
      <button 
      disabled={true}
      data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
      onClick={ListAll}
    >
        List All
    </button>
      </div>      
      <div className='pt-6 overflow-auto'>
      <Table_Payments data={state.listPayment}/>
      </div>
    </DefaultLayout>
  )
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

export default Payments