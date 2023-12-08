import {Outlet, Navigate} from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"


export default function ProtectedRoute(){
    const auth = useAuth();


    if(localStorage.getItem('token')){
        auth.isAuthenticated = true
        return auth.isAuthenticated ? <Outlet/> : <Navigate to="/client" />;
    }else{
        return auth.isAuthenticated ? <Outlet/> : <Navigate to="/" />;
    }
    

}