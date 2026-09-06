// import CartCount from "@/components/CartCount";
import CartIcon from "@/components/CartIcon";
import Menu from "@/components/Menu";


import Link from "next/link";

// import { PiShoppingCartSimpleThin } from "react-icons/pi";

export default function ShopLayout({
  children,}: {
  children: React.ReactNode;}) 
  {
  
  return <>
  
  <header className="m-3 ">
    <div className=" float-left ">
    <div className="p-3 rounded-lg bg-red-400 float-left">
     
      <p className="hover:pointer"> <Link href="\login">ورود</Link><span> / </span><span>
        <Link href="\signin">ثبت نام  </Link></span></p>
      
      

    </div>
    <CartIcon/>
    {/* <div className="p-1 ml-3  float-left border-1 rounded-2xl border-gray-400">
       <PiShoppingCartSimpleThin size={40} color="gray"  />
       <div className=" absolute top-4 left-38 rounded-3xl bg-blue-200">
       <p className="p-1 text-xs font-bold">
          <CartCount/>
       </p>
       </div>
    </div> */}
    
   </div>
    {/* <div className="bg-gray- float-right">منو</div> */}
    <Menu/>
  </header>
  
  {children}

  </>;
}