import { useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { Loan } from '../models/models'
import Api from '../controllers/user.controller'
import Modal_Loan from '../components/Modal_Loan'
import Table_Loan from '../components/Table_Loan'


interface State {
  loans: Loan | null
  listLoans: Loan[]
}

type PropsRole={
  type: string | null;
}

const Loans = ({type}: PropsRole) => {

  const[state, setState] = useState<State>({
    loans: null,
    listLoans:[]
})

useEffect(() => {
    (async function getLoans() {
        const api = new Api()
        const response = (await api.getLoansjoin()).data
        setState({loans:null, listLoans:response})
        console.log(state.listLoans)
    })();
},[]);



if(type == 'admin' || type == 'client' || type == 'supervisor' || type == 'collector')
{
  return (
    <DefaultLayout>
        <div className='py-8 overflow-auto'>
        <Table_Loan data={state.listLoans}/>
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

export default Loans