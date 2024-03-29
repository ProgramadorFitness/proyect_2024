import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse } from "../../models/types/types";
import { useNavigate } from "react-router-dom";
import Api from "../user.controller";
import { hasRole } from "./role";

interface AuthProviderProps{
    children: React.ReactNode,
}
const AuthContext = createContext({
    isAuthenticated: false,
    userType: ""
    
})


export function AuthProvider({children}: AuthProviderProps){


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUSerType] = useState("")

    /*return hasRole(arrRole, rol) ? <>{children}</> : null ;
}*/
    
   // const [accessToken, setAccessToken] = useState<string | null>(null);
    



    /*async function checkAuth() {

        try {
            const token = localStorage.getItem('token')
            setAccessToken(token)
            if(accessToken != null){

                const api = new Api();
                const response = await (await api.postToken(token)).data
                console.log(response)
                if(response.ok){
                    console.log("llego el torpe")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }*/




    return (
        <AuthContext.Provider value={{ isAuthenticated, userType }}>
        {children}
        </AuthContext.Provider>);
    
}
 
export const useAuth = () => useContext(AuthContext);