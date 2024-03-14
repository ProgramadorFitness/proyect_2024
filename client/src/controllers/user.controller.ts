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

    public deleteClien(id_client:number){
        return axios.delete(`http://localhost:5001/api/clients/delete/${id_client}`)
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

    public deleteLoan(id_loan:string){
        return axios.delete(`http://localhost:5001/api/loans/delete/${id_loan}`)
    }

    public getLoansId(id:string){
        return axios.get(`http://localhost:5001/api/loans/listjoin/${id}`)
    }

    public getLoansIdUser(id:string){
        return axios.get(`http://localhost:5001/api/loans/listjoinUser/${id}`)
    }

    public getLoansIdUserCollector(id:string){
        return axios.get(`http://localhost:5001/api/loans/listjoinUserCollector/${id}`)
    }
    public updateStateLoan(id:string, state1:string){
        return axios.put(`http://localhost:5001/api/loans/updateState/${id}`, { state:state1})
    }

    public updateState2(id:string, state1:string){
        return axios.put(`http://localhost:5001/api/loans/updateState2/${id}`, { state:state1})
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
    public getUserIdent(id:number){
        //return axios.get("http://localhost:5001/api/clients/list")
        //const token =  localStorage.getItem('token')
        return axios.get(`http://localhost:5001/api/collectors/One/${id}`)
    }

    public updateCollector(id:string,
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
        return axios.put(`http://localhost:5001/api/collectors/update/${id}`,
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

    public getCollectors(){
        return axios.get("http://localhost:5001/api/collectors/list")
    }

    public deleteUser(id_user:string){
        return axios.delete(`http://localhost:5001/api/collectors/delete/${id_user}`)
    }

    public postCollector(
        id:string,
        wallet:string,
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
        id_wallet:wallet,
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

    public getWalletsOne(){
        return axios.get("http://localhost:5001/api/wallets/listOne")
    }

    public getWalletsjo(){
        return axios.get("http://localhost:5001/api/wallets/listjoin")
    }

    public getWalletsjoin(id:number){
        return axios.get(`http://localhost:5001/api/wallets/listjoin/${id}`)
    }

    public deleteWallet(id:number){
        return axios.delete(`http://localhost:5001/api/wallets/delete/${id}`)
    }

    public postWallets(capital:string){
        return axios.post("http://localhost:5001/api/wallets/create", {capital:capital})
    }

    public walletsConsultUser(id:string){
        return axios.get(`http://localhost:5001/api/wallets/listjoinUser/${id}`)
    }

    public walletsConsultUserName(id:string){
        return axios.get(`http://localhost:5001/api/wallets/listjoinUserName/${id}`)
    }

    public getWalletsId(id:number){
        return axios.get(`http://localhost:5001/api/wallets/One/${id}`)
    }

    public updateWallet(id:string, capital:string){
        return axios.put(`http://localhost:5001/api/wallets/update/${id}`,
        {capital:capital})
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

    public getCollectionsJoinIDUser(id:string){
        return axios.get(`http://localhost:5001/api/collections/listjoinIDUser/${id}`)
    }

    public getCollectionsJoinIDUserCollector(id:string){
        return axios.get(`http://localhost:5001/api/collections/listjoinIDUserCollector/${id}`)
    }


    // Routes Payments

    public getStatePay(){
        return axios.get(`http://localhost:5001/api/payments/statePay`)
    }

    public addBlackList(){
        return axios.get(`http://localhost:5001/api/payments/addBlackList`)
    }
    public getPaymentId(id:string){
        return axios.get(`http://localhost:5001/api/payments/pay/${id}`)
    }

    public getPaymentClient2(id:string){
        return axios.get(`http://localhost:5001/api/payments/pay2/${id}`)
    }

    public getPaymentCollector2(id:string){
        return axios.get(`http://localhost:5001/api/payments/pay3/${id}`)
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
