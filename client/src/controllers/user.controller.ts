import axios from "axios";


export default class Api {

    // Routes Login
    public getLogin(username:string, password:string){
        return axios.post("http://localhost:5001/api/users/login", {username, password})
    }

    public postUser(id:string, username:string, password:string, type:string){
        return axios.post("http://localhost:5001/api/users/create", {id: id, username :username, password: password, type:type})
    }

    public postToken(token: string | null){
        return axios.post("http://localhost:5001/api/validate",  {headers:{authorization : `Bearer ${token}` }})
        //return axios.defaults.headers.post['Authorization'] = token
    }

    public getLoginSQL(username: string, password:string){
        return axios.get(`http://localhost:5001/api/login/login/${username},${password}`)
    }

    // Routes Clients
    public getClients(){
        //return axios.get("http://localhost:5001/api/clients/list")
        const token =  localStorage.getItem('token')
        return axios.get("http://localhost:5001/api/clients/list", {headers:{authorization : `Bearer ${token}` }} )
    }

    public getClientsId(id:number){
        //return axios.get("http://localhost:5001/api/clients/list")
        //const token =  localStorage.getItem('token')
        return axios.get(`http://localhost:5001/api/clients/One/${id}`)
    }

    public updateClients(id:string,
        id_number:string,
        name:string,
        lastName:string,
        address:string,
        genre:string,
        email:string,
        city:string,
        neigt:string,
        phone:string,
        phone2:string,
        state1:string){
        return axios.put(`http://localhost:5001/api/clients/update/${id}`,
        {id_number:id_number,
        name:name,
        lastName:lastName,
        address:address,
        genre:genre,
        email:email,
        city:city,
        neighborhood:neigt,
        phone:phone,
        phone2:phone2,
        state:state1})
    }

    public getClientsIdent(id:string){
        return axios.get(`http://localhost:5001/api/clients/ident/${id}`)
    } 
    
    public postClient(
        id:string,
        name:string,
        lastName:string,
        address:string,
        genre:string,
        email:string,
        city:string,
        neigt:string,
        phone:string,
        phone2:string,
        state1:string){
        return axios.post("http://localhost:5001/api/clients/create",{
        id_number:id,
        name:name,
        lastName:lastName,
        address:address,
        genre:genre,
        email:email,
        city:city,
        neighborhood:neigt,
        phone:phone,
        phone2:phone2,
        state:state1})
    }

    //Routes Loans
    public getLoans(){
        return axios.get("http://localhost:5001/api/loans/list")
    }

    public getLoansId(id:string){
        return axios.get(`http://localhost:5001/api/loans/listjoin/${id}`)
    }

    public postLoans(
        id_client:string,
        value_initial:string,
        value_end:string, 
        interest:string, 
        state:string,
        id_wallet:string,
        startDate:string,
        finishDate:string,
        dues:string,
        duesValue:string,
        paymentF: string){
        return axios.post("http://localhost:5001/api/loans/create", {
            id_client:id_client, 
            value_initial:value_initial, 
            value_end:value_end, 
            interest:interest, 
            state:state, 
            id_wallet:id_wallet,
            startLoan:startDate,
            finishLoan:finishDate,
            dues:dues,
            duesValue:duesValue,
            paymentF:paymentF
        })
    }
    
    public getLoansjoin(){
        return axios.get("http://localhost:5001/api/loans/listjoin")
    }


    // Routes Collectors
    public getCollectors(){
        return axios.get("http://localhost:5001/api/collectors/list")
    }

    public postCollector(
        id:string,
        name:string,
        lastName:string,
        address:string,
        genre:string,
        email:string,
        city:string,
        neigt:string,
        phone:string,
        state1:string){
        return axios.post("http://localhost:5001/api/collectors/create",{
        id_number:id,
        name:name,
        lastName:lastName,
        address:address,
        genre:genre,
        email:email,
        city:city,
        neighborhood:neigt,
        phone:phone,
        state:state1})
    }

    public getCollectorsid(id:string){
        return axios.get(`http://localhost:5001/api/collectors/id/${id}`)
    }
    


    //Routes Wallets
    public getWallets(){
        return axios.get("http://localhost:5001/api/wallets/list")
    }

    public getWalletsjoin(id:number){
        return axios.get(`http://localhost:5001/api/wallets/listjoin/${id}`)
    }

    public postWallets(capital:string){
        return axios.post("http://localhost:5001/api/wallets/create", {capital:capital})
    }

    
    //Routes collections
    public getCollections(){
        return axios.get("http://localhost:5001/api/collections/list")
    }

    public getCollectionsJoin(){
        return axios.get("http://localhost:5001/api/collections/listjoin")
    }

    public getCollectionsJoinID(id:string){
        return axios.get(`http://localhost:5001/api/collections/listjoinID/${id}`)
    }


    // Routes Payments
    public getPaymentId(id:string){
        return axios.get(`http://localhost:5001/api/payments/pay/${id}`)
    }

    public getPaymentClient2(id:string){
        return axios.get(`http://localhost:5001/api/payments/pay2/${id}`)
    }


    public postPaymentsLoans(
        id_loan:string,
        index:string,
        datePayments:string,
        statePayments:string){
        return axios.post("http://localhost:5001/api/payments/create", {
            id_loan:id_loan,
            dues: index,
            date: datePayments,
            state: statePayments
        })
    }

    public getPay(){
        return axios.get(`http://localhost:5001/api/payments/list`)
    }

    public getPayId(id:string){
        return axios.get(`http://localhost:5001/api/payments/listjoin/${id}`)
    }

    public postPayments(
        id:string,
        payment:string,
        realDate:string,
        observation:string,
        outBalance:number,
        state:string
        ){
        return axios.put(`http://localhost:5001/api/payments/create2/${id}`,{
        payment:payment,
        realDate:realDate,
        observation:observation,
        outBalance:outBalance,
        state:state
        })
    }
}
