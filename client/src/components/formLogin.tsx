import { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Api from "../controllers/user.controller";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/types";



const FormLogin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();


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

      
      try {
        const api = new Api();
        const token = await (await (api.getLogin(username, password))).data
        //console.log(token)

        if(token){
          localStorage.setItem('token', token)
          auth.isAuthenticated = true;
          goTo("/client");
          
        }else{
          console.log("error")
        }
        

      } catch (error) {
        console.log(error);
      }
    }

  return (
    <DefaultLayout>
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-slate-400  rounded flex flex-col items-center gap-5">
          <div className="p-8">
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
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}


export default FormLogin
