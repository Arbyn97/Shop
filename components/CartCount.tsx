'use client'

import { CartContext } from "@/context/CartContext";


import { useContext } from "react";

function CartCount() {
    const {cart}=useContext(CartContext)
  
    return (
        <>
       
       
            {cart.length}
       
            
        </>
    );
}

export default CartCount;