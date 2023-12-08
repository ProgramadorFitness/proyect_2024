/*import { Link } from "react-scroll";*/
import { Link, useNavigate } from "react-router-dom";
import {FaTimes, FaBars} from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
/*import Image from '../assets/icono.png';*/
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
//import { useAuth } from "../auth/AuthProvider";


const Nav = () => {
    const [click, setClick] = useState(false);
    const auth = useAuth();
    const goTo = useNavigate();

    const handleClick = () => {
        setClick(!click);
    }

    const handleClickLogOut = () => {
        
        localStorage.removeItem('token')
        auth.isAuthenticated = false
    }
    
    const  content = <>
        <div className="lg:hidden block absolute top-16 w-full left-0 rigth-0 bg-slate-300 transition overflow-y-auto overflow-x-auto">
            <ul className="text-center text-xl p-20"> 

                    <Link spy={true} smooth={true} to="/dashboard" > 
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Home</li>
                    </Link>               
                    <Link spy={true} smooth={true} to="/wallet" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Wallets</li>
                    </Link>
                    <Link spy={true} smooth={true} to="/loan" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Loans</li>
                    </Link>                
                    <Link spy={true} smooth={true} to="/users" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Users</li>
                    </Link>
                    <Link spy={true} smooth={true} to="/client" >
                        <li className="my-4 py-4 border-b bg-slate-300 hover:rounded">Client</li>
                    </Link>
                    <Link spy={true} smooth={true} to="/" >
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
                    <Link spy={true} smooth={true} to="/dashboard" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Home</li>
                    </Link> 
                    <Link spy={true} smooth={true} to="/wallet" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Wallets</li>
                    </Link>
                    <Link spy={true} smooth={true} to="/loan" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Loans</li>
                    </Link>
                    <Link spy={true} smooth={true} to="/users" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Users</li>
                    </Link> 
                    <Link spy={true} smooth={true} to="/client" >
                        <li className="hover:text-fuchsia-600 transition bg-slate-300  hover:border-fuchsia-600 cursor-pointer">Client</li>
                    </Link> 
                    <Link spy={true} smooth={true} to="/" >
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