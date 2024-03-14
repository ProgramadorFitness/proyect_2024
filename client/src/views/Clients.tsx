import React, { useEffect, useRef, useState} from 'react'
import { Client } from '../models/models';
import DefaultLayout from './layout/DefaultLayout';
import Api from '../controllers/user.controller';
import Table_Client from './components/Table_Client';

type PropsRole={
  type: string | null;
}
interface State {
    client: Client | null
    listClient: Client[]
}


const Clients = ({type}: PropsRole) => {

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

      if(type == 'admin' || type == 'supervisor' || type == 'collector')
      {
        return (
          <DefaultLayout>
            <div className='py-8' >
              <Table_Client data={state.listClient} ></Table_Client>
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

export default Clients