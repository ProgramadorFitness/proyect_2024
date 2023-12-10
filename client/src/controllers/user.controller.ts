import axios from "axios";


export default class Api {
    public getLogin(username:string, password:string){
        return axios.post("http://localhost:5001/api/users/login", {username, password})
    }

    public postUser(id:string, username:string, password:string){
        return axios.post("http://localhost:5001/api/users/create", {id: id, username :username, password: password})
    }

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

    public postToken(token: string | null){
        return axios.post("http://localhost:5001/api/validate",  {headers:{authorization : `Bearer ${token}` }})
        //return axios.defaults.headers.post['Authorization'] = token
    }

    
    public getLoans(){
        return axios.get("http://localhost:5001/api/loans/list")
    }

    public postLoans(id_client:string, value_initial:string, value_end:string, interest:string, state:string, id_wallet:string){
        return axios.post("http://localhost:5001/api/loans/create", {id_client:id_client, value_initial:value_initial, value_end:value_end, interest:interest, state:state, id_wallet:id_wallet})
    }

    public getCollectors(){
        return axios.get("http://localhost:5001/api/collectors/list")
    }

    public getWallets(){
        return axios.get("http://localhost:5001/api/wallets/list")
    }

    public getWalletsjoin(id:number){
        return axios.get(`http://localhost:5001/api/wallets/listjoin/${id}`)
    }

    public getLoansjoin(){
        return axios.get("http://localhost:5001/api/loans/listjoin")
    }

    public getLoginSQL(username: string, password:string){
        return axios.get(`http://localhost:5001/api/login/login/${username},${password}`)
    }

    public getClientsIdent(id:string){
        return axios.get(`http://localhost:5001/api/clients/ident/${id}`)
    }

    public getCollectorsid(id:string){
        return axios.get(`http://localhost:5001/api/collectors/id/${id}`)
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


}
