'use client'
import { useEffect, useState } from "react";
import ProductLists from "./ProductLists";
import getProducts from "@/lib/LoadProducts";


function Shop() {
    const [product,setProduct]=useState([])
    useEffect(()=>{
        const loadProducts=async ()=>{
            // const products=await fetch('./db.json')
            // const data=await products.json()
            const data=await getProducts()
            setProduct(data)
        }
        loadProducts();
    },[])
    return ( 
        <>
      
        <ProductLists details={product}/>
        </>
     );
}

export default Shop;