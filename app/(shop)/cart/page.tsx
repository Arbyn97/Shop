// 'use client'

import CartDetails from "@/components/CartDetails";

// import { CartContext } from "@/context/CartContext";
// import { useContext } from "react";
// import Image from "next/image";
// import RegisterCart from "./RegisterCart";
// import { useRouter } from "next/navigation";

function  Cart() {
//   const router=useRouter()
//     const {cart}=useContext(CartContext)
//     if(cart.length===0){
//         return <p> سبد کالای شما خالی است</p>
//     }
//     const payfor=()=>{
// return router.push(`/login`)
//     }
    return ( 
        <>
        {/* <div className="flex justify-center  gap-8 w-[90%]">
        
    <div className=" p-3 border-2 m-3 border-pink-300 h-70 w-100">
      <h1>
        پرداخت
      </h1>
      <RegisterCart/>

      
      <button onClick={payfor}
       className="rounded-xl bg-rose-500 cursor-pointer text-white font-bold m-5 p-3">
         ثبت سفارش
          </button>
    </div>

     <div  className="p-5 border-2 m-3">
      <h1>سبد خرید</h1>

      {cart.map((product) => (
        <div dir="rtl" key={product.id} className="flex justify-center items-center shadow-2xl">
           <Image className="border-2 border-pink-100 m-5" src={product.image} width={100 } height={100} alt={product.title}/>
          <div className="p-4">
          <p>{product.title}</p>
          <p>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
    </div> */}
    <CartDetails/>
        </>
     );
}

export default Cart;