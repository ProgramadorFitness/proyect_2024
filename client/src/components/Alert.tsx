import React, { ReactNode } from 'react'
import { FaWindowClose, FaCheck} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
type AlertProps = {
    variant?: "success" | "danger" | "warning";
    children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Alert({ variant = "success", children } : AlertProps){
  
  const classVariant = {
    success:"p-4 shadow inline-block max-w-lg bg-green-300 text-green-900 rounded-md m-2",
    danger:"p-4 shadow inline-block max-w-lg bg-red-300 text-red-900 rounded-md m-2",
    warning:"p-4 shadow inline-block max-w-lg bg-yellow-300 text-yellow-900 rounded-md m-2"
  }
  
  return (
    <div className={classVariant[variant] +
      " flex gap-2 items-center justify-center mx-auto"}>
      <span className="text-2xl">
        {variant === "success" ? (<FaCheck/>)
        :variant === "danger" ? (<FaWindowClose/>) 
        : (<IoIosWarning />)}
        </span>
        {children}
    </div>
  )
}

