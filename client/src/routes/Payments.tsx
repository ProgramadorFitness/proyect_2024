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

useEffect(() => {
  (async function getPayId() {
    const id_loan = localStorage.getItem('id_loan_temp')
      const api = new Api()
      const response2 = (await api.getPayId(String(id_loan))).data
      setState({payment:null, listPayment:response2})
      const lsit1 = response2
      console.log(lsit1.length)

      /*const response = (await api.getWalletsjoin(lsit1.length)).data
      setState({wallet:null, listWallet:response})*/
  })();
},[]);




  return (
    <DefaultLayout>
        <Table_Payments data={state.listPayment}/>
    </DefaultLayout>
  )
}

export default Payments