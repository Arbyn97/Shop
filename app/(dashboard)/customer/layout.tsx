"use client";

import Link from "next/link";


import Menu from "@/components/Menu";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
export default function CustomerLayout({
  children}: {
  children: React.ReactNode;}) {
    
   
     const router = useRouter();

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext پیدا نشد");
  }

  const { setCart } = context;

  const handleLogout = () => {
    // حذف شناسه کاربر
    localStorage.removeItem("userID");

    // حذف سبد مهمان
    localStorage.removeItem("cart");

    // پاک کردن سبد از Context
    setCart([]);

    // رفتن به صفحه Login
    router.push("/login");
  };
   
    return (
        <>
        {/* <div>
            <div>
                <div className="float-right">
                      <Menu/>
                 </div>
                   <div className=" p-4">
                     <Link href="/login">
                          <ul>
                               خروج
                          </ul>
                     </Link>
                    </div>
             </div>
         <div>
        {children}
        </div>
        </div> */}
         <div>
        <div>
          <div className="float-right">
            <Menu />
          </div>

          <div className="p-4">
            <button
              onClick={handleLogout}
              className="cursor-pointer"
            >
              خروج
            </button>
          </div>
        </div>

        <div>
          {children}
        </div>
      </div>
        </>
      );
};