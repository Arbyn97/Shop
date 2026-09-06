



type Props = {
  params: Promise<{
    id: string;
  }>;
};


import CartDetails from "@/components/CartDetails";
import RedirectToLogin from "@/components/RedirectToLogin";
import { allusers } from "@/lib/allusers";

import { User } from "@/types/user";


export default async function Profile ({ params }: Props) {

 const { id } = await params;

// const res = await fetch("http://localhost:3000/api/users");
// const data :User[]= await res.json();
const data: User[] = await allusers();
const result =data.find(item=>item.id===Number(id))
if (!result) {
  return <p>404 not found</p>;
}

    return ( 
        <>
        {/* <div>
        <CartDetails/>
        </div> */}
          <RedirectToLogin/>
        
        </>
     );
}

