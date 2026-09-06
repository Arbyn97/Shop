'use client'
import CartCount from "@/components/CartCount";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import getUserFromLocalStorage from "@/lib/getUserFromLS";


import { useRouter } from "next/navigation";
function CartIcon() {
      const id=getUserFromLocalStorage()
      const  router=useRouter()
      const redirectHndle=()=>{
         if(id){
            router.push(`/customer/${id}`)
         }
         else{
            router.push("/login")
         }
      }
    return ( 
        <>
        
          {/* <Link  href={`/customer/${id}`}> */}
         <div onClick={redirectHndle}
         className="cursor-pointer p-1 ml-3  float-left border-1 rounded-2xl border-gray-400">
       <PiShoppingCartSimpleThin size={40} color="gray"  />
       <div className=" absolute top-4 left-38 rounded-3xl bg-blue-200">
       <p className="p-1 text-xs font-bold">
          <CartCount/>
       </p>
       </div>
    </div>
    {/* </Link> */}
        </>
     ); 
}

export default CartIcon;