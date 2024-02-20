import { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Api from "../controllers/user.controller";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/types";
import jwt  from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from 'react-hot-toast';
import { HashLoader } from "react-spinners";


const FormLogin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();
  const [loading, setLoading] = useState(false);



    function handleChange(e: React.ChangeEvent) {
      const { name, value } = e.target as HTMLInputElement;
      if (name === "username") {
        setUsername(value);
        //console.log(username)
      }
      if (name === "password") {
        setPassword(value);
      }
        }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      //toast.success('Successfully')
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        const api = new Api();
        const token = await (await (api.getLogin(username, password))).data

        if (!loading) {
          const id = toast.success('Successfully');
          setTimeout(() => {
            toast.dismiss(id); 
            goTo("/dashboard") 
          }, 2000); 
        }
          localStorage.setItem('token', token)
          auth.isAuthenticated = true;
          const decodedHeader = jwtDecode(token);
          const decodedHeaderType = decodedHeader.type
          const idUser = decodedHeader.id
          localStorage.setItem('typeUser', decodedHeaderType);
          localStorage.setItem('idUser', idUser)
          
      } catch (error) {
        console.log(error);
        toast.error('Failed connection')
      }
      finally {
        // Detiene la carga después de la simulación
        setLoading(false);
      }
    }

  return (
    <DefaultLayout>
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-slate-400  rounded flex flex-col items-center gap-5">
          <div className="p-8">
          {loading && (
            <HashLoader loading={loading} size={50} color="#000000" />
          )}
          { !loading && (
            <form
              className="grid justify-items-center text-center"
              onSubmit={handleSubmit}
            >
              <div className="border-b border-gray-900/10  ">
                <h1 className=" font-semibold leading-7 text-gray-900 text-3xl">
                  Login
                </h1>
              </div>
              {!!errorResponse && (
                <div className="errorMessage">{errorResponse}</div>
              )}
              <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <input
                className="text-center mt-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                type="text"
                value={username}
                onChange={handleChange}
                name="username"
              />

              <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <input
                className="text-center mt-6 text-center mt-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />

              <button className="mt-4 block rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400">
                Login
              </button> 
            </form>
            )}
          </div>
        </div>
      </div> 
      <Toaster position="top-right"/>
    </DefaultLayout>
  )
}


export default FormLogin
