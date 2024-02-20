import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Table_Collections from '../components/Table_Collections'
import { Payment } from '../models/models'
import Api from '../controllers/user.controller'

interface State {
  payment: Payment | null
  listPayment: Payment[]
}

type PropsRole={
  type: string | null;
}

const Collections = ({type}: PropsRole) => {

  const[state, setState] = useState<State>({
    payment: null,
    listPayment:[]
  })

  //desabled for client
  const [disabled, setDisable] = useState(false);
  
  //call to API
  const api = new Api()

  const id_pay = localStorage.getItem('id_pay_temp')
  const typeUser = String(localStorage.getItem('typeUser'));
  const idUser = String(localStorage.getItem('idUser'));
    //console.log(id_loan)

    function ListAll (){
      localStorage.removeItem('id_pay_temp')
      location.reload()
    }

  useEffect(() => {
    (async function getCollection() {   
        
      if(typeUser == 'client'){
        setDisable(true)
        const response = (await api.getCollectionsJoinIDUser(idUser)).data
          console.log(response)
          setState({payment:null, listPayment:response})
      }else if(typeUser == 'collector'){
        const response3 = (await api.walletsConsultUser(idUser)).data

        if (id_pay == null) {
          const response = (await api.getCollectionsJoinIDUserCollector(idUser)).data
          console.log(response)
          setState({payment:null, listPayment:response})
        }else{
          const response = (await api.getCollectionsJoinID(id_pay)).data
          console.log(response)
          setState({payment:null, listPayment:response})
        }
      }else{
        if (id_pay == null) {
          const response = (await api.getCollectionsJoin()).data
          console.log(response)
          setState({payment:null, listPayment:response})
        }else{
          const response = (await api.getCollectionsJoinID(id_pay)).data
          console.log(response)
          setState({payment:null, listPayment:response})
        }
      }
    })();
},[]);

if(type == 'admin' || type == 'client' || type == 'supervisor' || type == 'collector')
{
  return (
   <DefaultLayout>
    <div className='pt-6 pl-10'>
      <button disabled={disabled}
      className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button"      onClick={ListAll}
        >
          List All
      </button>
    </div> 
    <div className=''>
    <Table_Collections data={state.listPayment}/>
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
export default Collections