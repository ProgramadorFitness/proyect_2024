import React, { useEffect, useState} from 'react'
import { Client } from '../models/models';
import DefaultLayout from '../layout/DefaultLayout';
import Api from '../controllers/user.controller';
import Modal_Client from '../components/Modal_Client';
import Table_Client from '../components/Table_Client';



interface State {
    client: Client | null
    listClient: Client[]
}


const Clients = () => {

    const[state, setState] = useState<State>({
        client: null,
        listClient:[]
    })


 
    useEffect(() => {
        (async function getClients() {
            const api = new Api()
            const response = (await api.getClients()).data
            console.log(response)
            setState({client:null, listClient:response})
        })();
    },[]);


      return (
      <div >
      <DefaultLayout>
        <div className='pt-6'>
        <Modal_Client/>
        </div>
        <div className='py-8' >
          <Table_Client data={state.listClient}/>
        </div>
      </DefaultLayout>
      
    </div>)

  
}

export default Clients