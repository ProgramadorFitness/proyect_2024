import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Table_Collections from '../components/Table_Collections'
import { Payment } from '../models/models'
import Api from '../controllers/user.controller'

interface State {
  payment: Payment | null
  listPayment: Payment[]
}

const Collections = () => {

  const[state, setState] = useState<State>({
    payment: null,
    listPayment:[]
  })

  const id_pay = localStorage.getItem('id_pay_temp')
    //console.log(id_loan)

    function ListAll (){
      localStorage.removeItem('id_pay_temp')
      location.reload()
    }

  useEffect(() => {
    (async function getCollection() {   
        const api = new Api()
        if (id_pay == null) {
          const response = (await api.getCollectionsJoin()).data
          console.log(response)
          setState({payment:null, listPayment:response})
        }else{
          const response = (await api.getCollectionsJoinID(id_pay)).data
          console.log(response)
          setState({payment:null, listPayment:response})
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
    <div className='pt-6 overflow-auto'>
    <Table_Collections data={state.listPayment}/>
    </div>
   </DefaultLayout>
  )
}

export default Collections