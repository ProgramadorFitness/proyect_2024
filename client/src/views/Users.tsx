import React, { useEffect, useState } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import { Collector } from '../models/models'
import Api from '../controllers/user.controller'
import Modal_Signup from './components/Modal_Signup'
import Modal_Add_Users from './components/Modal_Add_User'
import Table_User from './components/Table_User'

interface State {
  collector: Collector | null
  listCollector: Collector[]
}

type PropsRole={
  type: string | null;
}

const Users = ({type}: PropsRole) => {

  const[state, setState] = useState<State>({
    collector: null,
    listCollector:[]
  })

  useEffect(() => {
    (async function getClients() {
        const api = new Api()
        const response = (await api.getCollectors()).data
        setState({collector:null, listCollector:response})
    })();
},[]);


if(type == 'admin'  || type == 'supervisor' )
{
  return (
    <DefaultLayout>
        <div className='py-8'>
          <Table_User data={state.listCollector}/>
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

export default Users