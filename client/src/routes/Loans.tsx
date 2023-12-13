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

const Loans = () => {

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

  return (
    <DefaultLayout>
        <div className='pt-6'>
        <Modal_Loan/>
        </div>
        <div className='py-8'>
        <Table_Loan data={state.listLoans}/>
        </div>
    </DefaultLayout>
  )
}

export default Loans