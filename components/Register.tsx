'use client'

import { useRouter } from "next/navigation";
import { findUser } from "@/lib/findUsser";
import { useState } from "react";
import { createUser } from "@/lib/createUser";

function RegisterForm() {
    const router=useRouter();
    const [dataform,setDataform]=useState({email:"",password:"",name:""})
   const [message,setMessage]=useState({emailmessage:"",passmessage:"",})
   
    const hndleForm=async(e: React.FormEvent<HTMLFormElement>)=>{
        
            e.preventDefault();
            //فرمت ایمیل
            const emailFormat=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            //فرمت پسورد
            const passWordFormat= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*:()?&])[A-Za-z\d@$!:)(%*?&]{8,}$/;
            let emailError=""
            let passwordError=""
            if(!emailFormat.test(dataform.email)){
              
              emailError="فرمت ایمیل صحیح نمی باشد";
            }
            
            if(!passWordFormat.test(dataform.password)){
             
              passwordError="رمز عبور باید حداقل ۸ کاراکتر و شامل حرف بزرگ، حرف کوچک، عدد و کاراکتر خاص باشد."
            }
            const result=await findUser(dataform.email,dataform.password)
            // if(user.success){
            //   alert('این حساب وجود دارد')

            // }
           if(result.failed){
            
            const newUser=await createUser(dataform.name,dataform.email,dataform.password)
           
           return router.push(`/customer/${newUser.id}`)
           }
           else{
             alert('این حساب وجود دارد')
           }
           
          setMessage({emailmessage:emailError,passmessage:passwordError})
           
    }
    return ( 
        <>
        <form className="flex  flex-col m-auto items-center justify-center" onSubmit={hndleForm}>
            <input type="text"  onChange={(e)=>setDataform({...dataform,name:e.target.value})}
             placeholder="نام"
              className="m-2 rounded-xl border-2 border-pink-300 focus:p-1 p-1 focus:outline-none focus:shadow-2xs"/>
            <input type="text" onChange={(e)=>setDataform({...dataform,email:e.target.value})}
            placeholder="ایمیل"
             className="m-2 rounded-xl border-2 border-pink-300 focus:p-1 p-1 focus:outline-none focus:shadow-2xs"/>
              {message.emailmessage &&<p>{message.emailmessage}</p>}
            
            <input type="password" onChange={(e)=>setDataform({...dataform,password:e.target.value})}
            placeholder="پسورد"
             className="m-2 rounded-xl border-2 border-pink-300 focus:p-1 p-1 focus:outline-none focus:shadow-2xs"/>
             {message.passmessage &&<p>{message.passmessage}</p>}
            <button className="px-3 p-2 m-3 border-2 border-pink-500 hover:border-none rounded-2xl text-[20px] text-gray-700 font-bold hover:bg-gradient-to-r hover:from-pink-300/80 hover:to-pink-300/50">ثبت نام</button>
        </form>
        </>
     );
}

export default RegisterForm;
