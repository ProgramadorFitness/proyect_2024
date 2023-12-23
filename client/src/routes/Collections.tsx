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

  useEffect(() => {
    (async function getClients() {
        const api = new Api()
        const response = (await api.getCollectionsJoin()).data
        console.log(response)
        setState({payment:null, listPayment:response})
    })();
},[]);


  return (
   <DefaultLayout>
        <Table_Collections data={state.listPayment}/>
   </DefaultLayout>
  )
}

export default Collections