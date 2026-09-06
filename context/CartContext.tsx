"use client";

import { createContext, useEffect, useState } from "react";

type CartContextType = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
};

export const CartContext =
  createContext<CartContextType | null>(null);

const MyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // دریافت سبد مهمان از localStorage
  useEffect(() => {
    const userID = localStorage.getItem("userID");

    // اگر کاربر لاگین نیست،
    // سبد مهمان را از localStorage بخوان
    if (!userID) {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }

    setIsLoaded(true);
  }, []);

  // ذخیره فقط سبد مهمان در localStorage
  useEffect(() => {
    if (!isLoaded) return;

    const userID = localStorage.getItem("userID");

    // کاربر لاگین است
    // پس cart مربوط به DB است، نه guest cart
    if (userID) {
      return;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart, isLoaded]);

  // تغییر localStorage در تب دیگر
  useEffect(() => {
    const handleStorageChange = (
      event: StorageEvent
    ) => {
      if (event.key === "cart") {
        setCart(
          event.newValue
            ? JSON.parse(event.newValue)
            : []
        );
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default MyProvider;






// 'use client'
// import { createContext, useEffect, useState } from "react"

// type CartContextType = {
//   cart: unknown[];
//   setCart: React.Dispatch<React.SetStateAction<unknown[]>>;
// };

// export const CartContext= createContext<CartContextType | null>(null);

//  const MyProvider=({children}: {
//   children: React.ReactNode;})=>{
//     const [cart,setCart]=useState<unknown[]>([]);
    
//      const [isLoaded, setIsLoaded] = useState(false);
//    useEffect(() => {
//     const savedCart = localStorage.getItem("cart");

//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//     setIsLoaded(true);
//   }, []);
//     useEffect(()=>{
//       localStorage.setItem('cart',JSON.stringify(cart))
//     },[cart,isLoaded])


//   // فهمیدن تغییرات از تب دیگر
//   useEffect(() => {
//     const handleStorageChange = (event: StorageEvent) => {
//       if (event.key === "cart") {
//         setCart(event.newValue ? JSON.parse(event.newValue) : []);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

   
//     return(
//         <CartContext.Provider value={{cart,setCart}}>
//             {children}
//         </CartContext.Provider>
//     )
// }
// export default MyProvider;
