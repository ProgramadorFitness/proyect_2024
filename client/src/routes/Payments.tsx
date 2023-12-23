import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Table_Payments from '../components/Table_Payments'
import { Payment } from '../models/models'
import Api from '../controllers/user.controller'


interface State {
  payment: Payment | null
  listPayment: Payment[]
}

const Payments = () => {

  const[state, setState] = useState<State>({
    payment: null,
    listPayment:[]
})

const id_loan = localStorage.getItem('id_loan_temp')
    console.log(id_loan)

    function ListAll (){
      localStorage.removeItem('id_loan_temp')
      location.reload()
    }

useEffect(() => {
  (async function getPayId() {
      const api = new Api()
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

  })();
},[]);




  return (
    <DefaultLayout>
      <div className='pt-6'>
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"
      onClick={ListAll}
    >
        List All
    </button>
      </div>      
      <div className='pt-6'>
      <Table_Payments data={state.listPayment}/>
      </div>
    </DefaultLayout>
  )
}

export default Payments