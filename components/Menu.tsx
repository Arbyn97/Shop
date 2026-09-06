'use client'
import Link from "next/link";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

function Menu() {

      const [showHide,setShowHide]=useState(false)
    return ( 

        <>
        <div dir="rtl" className="items-center justify-center">
            <div className="font-bold text-2xl p-3 cursor-pointer " onClick={()=>setShowHide(!showHide)}>
                
                
                <IoMdMenu/>
                </div>
            {showHide &&
            <nav className="fixed top-0 right-0 h-screen w-64 bg-white">
             <ul className="text-lg  mr-3 p-4">
                <IoArrowBack onClick={()=>setShowHide(false)} className="cursor-pointer"/>
        <li className="mt-5">
            <Link href="/">
            صفحه اصلی
             </Link>
        </li>
       

        
         <li className="mt-3">
            <Link href="/about">
           درباره پروژه
         </Link>
        </li>
       
            <li className="mt-3">
            <Link href="/admin">
          صفحه ادمین
         </Link>
        </li>
       
        
    </ul>
    </nav>
            
            }
   
    </div>
        </>
     );
}

export default Menu;