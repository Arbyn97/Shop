'use client'

import { CartContext } from "@/context/CartContext";
import { useContext, useState } from "react";

// باید کالاهایی که به سبد کالا اضافه شدن رو ایدی بگسری بعد قیمت هاون رو با هم جمع برنی

function RegisterCart() {

     
    const {cart}=useContext(CartContext)
    const totalPrice=cart.reduce((total,item)=>{
     
        const sum= total+item.count*(item.price)
        
        
        return Number(sum)
          
    },0)



    const totalCount = cart.reduce((total, item) => {
        return total + item.count;
    }, 0);




 return (
        <div
            dir="rtl"
            className="p-4"
        >

            <div className="flex items-center justify-between border-b border-gray-200 pb-4">

                <span className="text-lg">
                    تعداد کالا
                </span>

                <span className="font-bold text-lg">
                    {totalCount}
                </span>

            </div>


            <div className="flex items-center justify-between pt-4">

                <span className="text-lg">
                    مبلغ قابل پرداخت
                </span>

                <span className="font-bold text-lg">
                    {totalPrice} تومان
                </span>

            </div>

        </div>
    );




    
//     return ( 
//         <>
//         <div dir="rtl" className=" p-3 text-3xl">
//         <p>
//                     تعداد کالا
//                     <span className="p-6">
//                         {totalCount}
//                     </span>
//                 </p>
       
//         <p>مبلغ قابل پرداخت
//              <span className="p-5">{totalPrice} تومان</span>
//         </p>
       
//         </div>
//         </>
//      );
}

export default RegisterCart;