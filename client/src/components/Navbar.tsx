/*import { Link } from "react-scroll";*/
import { Link, useNavigate } from "react-router-dom";
import {FaTimes, FaBars} from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
/*import Image from '../assets/icono.png';*/
import { useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
//import { useAuth } from "../auth/AuthProvider";


const Nav = () => {
    const [click, setClick] = useState(false);
    const auth = useAuth();
    //const goTo = useNavigate();

    const handleClick = () => {
        setClick(!click);
    }

    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null)
    const handleDropDownFocus = (state: boolean) => {
      setOpen(!state);
    };
    const handleClickOutsideDropdown =(e)=>{
      if(open && !dropdownRef.current?.contains(e.target as Node)){
        setOpen(false)
        
      }
    }
    window.addEventListener("click",handleClickOutsideDropdown)
    
    console.log(open);

    const handleClickLogOut = () => {
        
        localStorage.removeItem('token')
        auth.isAuthenticated = false
    }
    
    const  content = <>
        <div className="lg:hidden block absolute top-16 w-full left-0 rigth-0 bg-slate-300 transition overflow-y-auto overflow-x-auto">
            <ul className="text-center text-xl p-20"> 

                    <Link  to="/dashboard" > 
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Home</li>
                    </Link>               
                    <Link  to="/wallet" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Wallets</li>
                    </Link>
                    <Link  to="/loan" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Loans</li>
                    </Link>                
                    <Link  to="/collector" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Collectors</li>
                    </Link>
                    <Link  to="/client" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Client</li>
                    </Link>
                    <li>
                    <div className="app-drop-down-container" ref={dropdownRef}>
                            <button onClick={(e) => handleDropDownFocus(open)}>Collections/Payments
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                            </button>
                            {open && (
                            <ul className="text-center text-xl p-20" >
                            <Link  to="/collection" >
                                <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Collections</li>
                            </Link>
                            <Link  to="/payment" >
                                <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Payments</li>
                            </Link>
                        </ul>  
                            )}
                        </div>
                    </li>
                    <Link  to="/" >
                        <li 
                        onClick={handleClickLogOut}
                        className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">LogOut</li>
                    </Link>
            </ul>
        </div>
    </>

  return (
    <nav>
        <div className="h-10vh flex justify-between z-50 text-black lg:py-5 px-20 py-4 flex-1 overflow-y-auto overflow-x-auto">
            < div className="flex items-left flex-1">
                <span className="text-3xl font-bold">
                    INVER CREDITOS
                </span>
            </div>
            <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
                <div className="flex-10">
                <ul className="flex gap-8 mr-16 text-[18px]">
                    <Link  to="/dashboard" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Home</li>
                    </Link> 
                    <Link  to="/wallet" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Wallets</li>
                    </Link>
                    <Link  to="/loan" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Loans</li>
                    </Link>
                    <Link  to="/collector" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Collectors</li>
                    </Link> 
                    <Link  to="/client" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Client</li>
                    </Link> 
                    <li>
                    <div className="app-drop-down-container" ref={dropdownRef}>
                            <button onClick={(e) => handleDropDownFocus(open)}>Collections/Payments
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                            </button>
                            {open && (
                            <ul className=" gap-8 mr-16 text-[18px] absolute">
                            <Link  to="/collection" >
                                <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Collections</li>
                            </Link>
                            <Link  to="/payment" >
                                <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Payments</li>
                            </Link>
                        </ul>  
                            )}
                        </div>
                    </li>
                    <Link  to="/" >
                        <li 
                        onClick={handleClickLogOut}
                        className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">LogOut</li>
                    </Link>
                </ul>
                </div>
            </div>
            <div>
                {click && content}
            </div>

            <button className="block sm:hidden transtion " onClick={handleClick}>
                {click ? <FaTimes/> : <FaBars/>}
            </button>
            </div>
        
    </nav>

  );
}

export default Nav;