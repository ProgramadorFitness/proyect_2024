import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { Collector } from '../models/models'
import Api from '../controllers/user.controller'
import Modal_Signup from '../components/Modal_Signup'
import Modal_Add_Users from '../components/Modal_Add_User'
import Table_User from '../components/Table_User'

interface State {
  collector: Collector | null
  listCollector: Collector[]
}

const Users = () => {

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

  return (
    <DefaultLayout>
      <div className='flex pt-6'>
      <div className='ps-6'>
        <Modal_Signup/>
        </div>
        <div className='ps-8'>
        <Modal_Add_Users/>
        </div>
      </div>
        <div className='py-8'>
          <Table_User data={state.listCollector}/>
        </div>
    </DefaultLayout>
  )
}

export default Users