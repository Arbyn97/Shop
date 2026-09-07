'use client'

import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  image:string
};

type Props = {
  data: Product;
};
function AddCartButton({data}:Props) {
    
    const {setCart}=useContext(CartContext)
    
    const hndleclickAdd=()=>{
     
        
        // setCart(prev => [...prev, data])
         setCart(prev => [...prev, {...data,count:1} ])
        
    }
    return ( 
        <>
         <button onClick={hndleclickAdd} className="bg-pink-300 text-pink-50 hover:text-pink-600 hover:bg-white hover:border-2 hover:border-pink-500 text-lg p-3 rounded-xl cursor-pointer">افزودن به سبد خرید</button>
        </>
     );
}

export default AddCartButton;
