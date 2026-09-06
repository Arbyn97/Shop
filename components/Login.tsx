"use client";

import { CartContext } from "@/context/CartContext";
import { findUser } from "@/lib/findUsser";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function LoginForm() {
  const router = useRouter();

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext پیدا نشد");
  }

  const { cart, setCart } = context;

  const [getInfoFromForm, setGetInfoFromForm] =
    useState({
      email: "",
      password: "",
    });

  const [message, setMessage] = useState({
    emailmessage: "",
    passmessage: "",
  });

  const hndleForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const emailFormat =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passWordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*:()?&])[A-Za-z\d@$!:)(%*?&]{8,}$/;

    let emailError = "";
    let passwordError = "";

    if (
      !emailFormat.test(
        getInfoFromForm.email
      )
    ) {
      emailError =
        "فرمت ایمیل صحیح نمی باشد";
    }

    if (
      !passWordFormat.test(
        getInfoFromForm.password
      )
    ) {
      passwordError =
        "رمز عبور باید حداقل ۸ کاراکتر و شامل حرف بزرگ، حرف کوچک، عدد و کاراکتر خاص باشد.";
    }

    setMessage({
      emailmessage: emailError,
      passmessage: passwordError,
    });

    // اگر validation مشکل داشت
    // وارد مرحله login نشو
    if (emailError || passwordError) {
      return;
    }

    const result = await findUser(
      getInfoFromForm.email,
      getInfoFromForm.password
    );

    if (!result.success) {
      console.log(result.message);
      return;
    }

    const userID = result.user.id;

    try {
      // -----------------------------
      // سبد قبلی همین کاربر
      // -----------------------------

      const res = await fetch(
        `/api/cartItems?userID=${userID}`
      );

      const userCartData = await res.json();

      const userCart =
        userCartData.items || [];

      // -----------------------------
      // Merge
      // -----------------------------

      const mergedCart = [...userCart];

      cart.forEach((guestItem) => {
        const existingItem =
          mergedCart.find(
            (item) =>
              item.id === guestItem.id
          );

        if (existingItem) {
          existingItem.count +=
            guestItem.count;
        } else {
          mergedCart.push(guestItem);
        }
      });

      // -----------------------------
      // ذخیره سبد نهایی User
      // -----------------------------

      const saveResponse = await fetch(
        "/api/cartItems",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userID: userID,
            items: mergedCart,
          }),
        }
      );

      if (!saveResponse.ok) {
        throw new Error(
          "ذخیره سبد خرید انجام نشد"
        );
      }

      // -----------------------------
      // Login
      // -----------------------------

      localStorage.setItem(
        "userID",
        JSON.stringify(userID)
      );

      // -----------------------------
      // حذف سبد مهمان
      // -----------------------------

      localStorage.removeItem("cart");

      // Context = سبد User
      setCart(mergedCart);

      // -----------------------------
      // انتقال
      // -----------------------------

      router.push(
        `/customer/${userID}`
      );
    } catch (error) {
      console.error(
        "خطا در انتقال سبد خرید:",
        error
      );
    }
  };

  return (
    <>
      <form
        onSubmit={hndleForm}
        className="flex flex-col m-auto items-center justify-center"
      >
        {/* email */}

        <input
          type="text"
          className="m-2 rounded-xl border-2 border-pink-300 focus:p-1 p-1 focus:outline-none focus:shadow-2xs"
          placeholder="ایمیل"
          onChange={(e) =>
            setGetInfoFromForm({
              ...getInfoFromForm,
              email: e.target.value,
            })
          }
        />

        {message.emailmessage && (
          <p>{message.emailmessage}</p>
        )}

        {/* password */}

        <input
          type="password"
          className="m-2 rounded-xl border-2 border-pink-300 focus:p-1 p-1 focus:outline-none focus:shadow-2xs"
          placeholder="پسورد"
          onChange={(e) =>
            setGetInfoFromForm({
              ...getInfoFromForm,
              password: e.target.value,
            })
          }
        />

        {message.passmessage && (
          <p>{message.passmessage}</p>
        )}

        <button
          className="px-3 p-2 m-5 border-2 border-pink-500 hover:border-none rounded-2xl text-[20px] text-gray-700 font-bold hover:bg-gradient-to-r hover:from-pink-300/80 hover:to-pink-300/50"
        >
          ورود
        </button>
      </form>
    </>
  );
}

export default LoginForm;








// 'use client'

// import { CartContext } from "@/context/CartContext";
// import {findUser} from "@/lib/findUsser";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useContext, useState } from "react";


// function LoginForm() {
//     const router=useRouter();

//     const {cart}=useContext(CartContext)
//     const [getInfoFromForm,setGetInfoFromForm]=useState({email:"",password:""})
  
//     const [message,setMessage]=useState({emailmessage:"",passmessage:"",})
//     const hndleForm=async (e: React.FormEvent<HTMLFormElement>)=>{
       
//             e.preventDefault();
//             const emailFormat=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             const passWordFormat= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*:()?&])[A-Za-z\d@$!:)(%*?&]{8,}$/;
//             let emailError=""
//             let passwordError=""
//             if(!emailFormat.test(getInfoFromForm.email)){
              
//               emailError="فرمت ایمیل صحیح نمی باشد";
//             }
            
//             if(!passWordFormat.test(getInfoFromForm.password)){
             
//               passwordError="رمز عبور باید حداقل ۸ کاراکتر و شامل حرف بزرگ، حرف کوچک، عدد و کاراکتر خاص باشد."
//             }
           
//           const result=await findUser(getInfoFromForm.email,getInfoFromForm.password)
//           if(result.success){ const userID = result.user.id;

//     // انتقال سبد مهمان به دیتابیس
//     if (cart.length > 0) {

//       const response = await fetch(
//         "/api/cartItems",
//         {
//           method: "PUT",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify({
//             userID: userID,
//             items: cart,
//           }),
//         }
//       );

//       const data = await response.json();

//       console.log("Cart saved:", data);
//     }


//     localStorage.setItem(
//       "userID",
//       JSON.stringify(userID)
//     );

//     router.push(`/customer/${userID}`);
//           }else{
//             console.log(result.message)
//           }
         
//           setMessage({emailmessage:emailError,passmessage:passwordError})
           
//     }
   
  
//     return ( 
        
//         <>
//         <form onSubmit={hndleForm} className="flex  flex-col m-auto items-center justify-center">
//             {/* email */}
//             <input type="text" 
//             className="m-2 rounded-xl border-2 border-pink-300 focus:p-1 p-1 focus:outline-none focus:shadow-2xs" 
//             placeholder="ایمیل" onChange={(e)=>setGetInfoFromForm({...getInfoFromForm,email:e.target.value})} />
//             {message.emailmessage &&<p>{message.emailmessage}</p>}
//             {/* password */}
//             <input type="password"
//              className="m-2 rounded-xl border-2 border-pink-300 focus:p-1 p-1 focus:outline-none focus:shadow-2xs" placeholder="پسورد"  onChange={(e)=>setGetInfoFromForm({...getInfoFromForm,password:e.target.value})}  />
//               {message.passmessage &&<p>{message.passmessage}</p>}
              
//             <button className="px-3 p-2 m-5 border-2 border-pink-500 hover:border-none rounded-2xl text-[20px] text-gray-700 font-bold hover:bg-gradient-to-r hover:from-pink-300/80 hover:to-pink-300/50">ورود</button>
//         </form>
       
//         </>
//      );
// }

// export default LoginForm;