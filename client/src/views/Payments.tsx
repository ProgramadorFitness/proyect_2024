import React, { useEffect, useState } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import Table_Payments from './components/Table_Payments'
import { Payment } from '../models/models'
import Api from '../controllers/user.controller'
import { format } from 'date-fns';



interface State {
  payment: Payment | null
  listPayment: Payment[]
}
type PropsRole = {
  type: string | null;
}

const Payments = ({ type }: PropsRole) => {

  const [state, setState] = useState<State>({
    payment: null,
    listPayment: []
  })
  //desabled for client
  const [disabled, setDisable] = useState(false);

  //call to API
  const api = new Api()

  const id_loan = localStorage.getItem('id_loan_temp')
  const typeUser = String(localStorage.getItem('typeUser'));
  const idUser = String(localStorage.getItem('idUser'));
  console.log(id_loan)

  function ListAll() {
    localStorage.removeItem('id_loan_temp')
    location.reload()
  }

  /*async function getPayExpired() {
    const response2 = (await api.getStatePay())
    const response3 = (await api.addBlackList())
    console.log(response2)
  }*/

  useEffect(() => {


    (async function getPayId() {

      if (typeUser == 'client') {
        setDisable(true)
        const response2 = (await api.getPaymentClient2(idUser)).data
        setState({ payment: null, listPayment: response2 })
        console.log(response2)
      } else if (typeUser == 'collector') {
        const response3 = (await api.walletsConsultUser(idUser)).data
        //console.log(response3[0].id_wallet)
        if (id_loan == null) {
          const response2 = (await api.getPaymentCollector2(response3[0].id_wallet)).data
          setState({ payment: null, listPayment: response2 })
          const lsit1 = response2
          console.log(lsit1)
        } else {
          const response2 = (await api.getPayId(String(id_loan))).data
          setState({ payment: null, listPayment: response2 })
          const lsit1 = response2
        }
      } else {
        if (id_loan == null) {
          const response2 = (await api.getPay()).data
          setState({ payment: null, listPayment: response2 })
          const lsit1 = response2
          console.log(lsit1)
        } else {
          const response2 = (await api.getPayId(String(id_loan))).data
          setState({ payment: null, listPayment: response2 })
          const lsit1 = response2
        }

      }
      const now = new Date();

      // Obtener la hora actual en formato de cadena de texto
      const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
            if (currentHour === 9 && currentMinute >= 0 && currentMinute <= 30) {
        //getPayExpired()
      }
      //getPayExpired()
    })

    


      ();
  }, []);


  if (type == 'admin' || type == 'client' || type == 'supervisor' || type == 'collector') {

    return (
      <DefaultLayout>
        <div className='pt-6 pl-10 '>
          <button
            disabled={disabled}
            className=" block text-black bg-slate-400 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400" type="button" onClick={ListAll}
          >
            List All
          </button>
        </div>
        <Table_Payments data={state.listPayment} />
      </DefaultLayout>
    )
  } else {
    return (
      <DefaultLayout>
        <div className='py-8' >
          No tiene permisos para este modulo
        </div>
      </DefaultLayout>
    )
  }
}

export default Payments