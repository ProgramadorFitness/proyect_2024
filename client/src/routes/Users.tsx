import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { User } from '../models/models'
import Api from '../controllers/user.controller'
import Modal_Signup from '../components/Modal_Signup'
import Modal_Add_Users from '../components/Modal_Add_User'
import Table_User from '../components/Table_User'

interface State {
  user: User | null
  listUser: User[]
}

const Users = () => {

  const[state, setState] = useState<State>({
    user: null,
    listUser:[]
  })

  useEffect(() => {
    (async function getClients() {
        const api = new Api()
        const response = (await api.getUsers()).data
        setState({user:null, listUser:response})
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
          <Table_User data={state.listUser}/>
        </div>
    </DefaultLayout>
  )
}

export default Users