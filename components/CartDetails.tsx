'use client'

import { CartContext } from "@/context/CartContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import RegisterCart from "./RegisterCart";
import { useRouter, useParams } from "next/navigation";

function CartDetails() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [payStatus, setPayStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext پیدا نشد");
  }

  const { cart, setCart } = context;

  // دریافت سبد خرید کاربر
  // useEffect(() => {
  //   const loadCart = async () => {
  //     const userID = localStorage.getItem("userID");

  //     if (!userID) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const res = await fetch(
  //         `/api/cartItems?userID=${Number(userID)}`
  //       );

  //       const data = await res.json();

  //       setCart(data.items || []);
  //       console.log(data)

  //     } catch (error) {
  //       console.error("خطا در دریافت سبد خرید", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadCart();
  
  // }, [setCart]);






// useEffect(() => {
//   const loadCart = async () => {

//     // اول سبد قبلی را از Context پاک کن
//     setCart([]);
//     setLoading(true);

//     const userID = localStorage.getItem("userID");

//     if (!userID) {
//       setLoading(false);
//       return;
//     }

//     // اطمینان از اینکه userID لاگین‌شده
//     // همان کاربر URL است
//     if (Number(userID) !== id) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         `/api/cartItems?userID=${Number(userID)}`
//       );

//       const data = await res.json();

//       setCart(data.items || []);

//       console.log("Cart user:", userID);
//       console.log("Cart data:", data);

//     } catch (error) {
//       console.error("خطا در دریافت سبد خرید", error);
//       setCart([]);
//     } finally {
//       setLoading(false);
//     }
//   };


//   loadCart();

// }, [id, setCart]);



useEffect(() => {
  const loadCart = async () => {
    setLoading(true);

    const userID =
      localStorage.getItem("userID");

    if (!userID) {
      setLoading(false);
      return;
    }

    // فقط همان کاربری که در URL است
    if (Number(userID) !== id) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/cartItems?userID=${Number(userID)}`
      );

      const data = await res.json();

      setCart(data.items || []);

      console.log(
        "Cart user:",
        userID
      );

      console.log(
        "Cart data:",
        data
      );
    } catch (error) {
      console.error(
        "خطا در دریافت سبد خرید",
        error
      );

      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  loadCart();
}, [id, setCart]);



  // ذخیره تغییرات Cart در دیتابیس
  const updateCartInDatabase = async (
    updatedCart: typeof cart
  ) => {
    try {
      const userID = localStorage.getItem("userID");

      if (!userID) {
        return;
      }

      const res = await fetch("/api/cartItems", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userID: Number(userID),
          items: updatedCart,
        }),
      });

      const data = await res.json();

      console.log(data);

    } catch (error) {
      console.error("خطا در ذخیره سبد خرید", error);
    }
  };


  // // حذف محصول
  // const deleteProduct = (productID: number) => {
  //   setCart((prev) => {

  //     const updatedCart = prev.filter(
  //       (item) => item.id !== productID
  //     );

  //     updateCartInDatabase(updatedCart);

  //     return updatedCart;
  //   });
  // };


  // // افزایش تعداد
  // const increment = (productID: number) => {
  //   setCart((prev) => {

  //     const updatedCart = prev.map((item) =>
  //       item.id === productID
  //         ? {
  //             ...item,
  //             count: item.count + 1,
  //           }
  //         : item
  //     );

  //     updateCartInDatabase(updatedCart);

  //     return updatedCart;
  //   });
  // };


  // // کاهش تعداد
  // const decrement = (productID: number) => {
  //   setCart((prev) => {

  //     const updatedCart = prev.map((item) =>
  //       item.id === productID && item.count > 1
  //         ? {
  //             ...item,
  //             count: item.count - 1,
  //           }
  //         : item
  //     );

  //     updateCartInDatabase(updatedCart);

  //     return updatedCart;
  //   });
  // };

// حذف محصول
const deleteProduct = async (
  productID: number
) => {
  const updatedCart = cart.filter(
    (item) => item.id !== productID
  );

  setCart(updatedCart);

  await updateCartInDatabase(updatedCart);
};


// افزایش تعداد
const increment = async (
  productID: number
) => {
  const updatedCart = cart.map(
    (item) =>
      item.id === productID
        ? {
            ...item,
            count: item.count + 1,
          }
        : item
  );

  setCart(updatedCart);

  await updateCartInDatabase(updatedCart);
};


// کاهش تعداد
const decrement = async (
  productID: number
) => {
  const updatedCart = cart.map(
    (item) =>
      item.id === productID &&
      item.count > 1
        ? {
            ...item,
            count: item.count - 1,
          }
        : item
  );

  setCart(updatedCart);

  await updateCartInDatabase(updatedCart);
};
  // ثبت Invoice
  const registerInDatabase = async () => {
    const res = await fetch("/api/invoices", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: Date.now(),
        userID: id,
        items: cart,
        status: "pending",
      }),
    });

    const response = await res.json();

    if (res.ok) {
      setPayStatus("pending");
    }

    return response;
  };


  // پرداخت
  const payFor = async () => {
    const loggedInId = localStorage.getItem("userID");

    if (
      loggedInId &&
      Number(loggedInId) === id
    ) {

      await registerInDatabase();

      router.push("/cart/payment");

    } else {

      router.push("/login");

    }
  };


  if (loading) {
    return <p>در حال دریافت سبد خرید...</p>;
  }


  if (cart.length === 0) {
    return (
      <div>
        <p>سبد کالای شما خالی است</p>
      </div>
    );
  }




return (
  <div className="flex justify-center items-start gap-8 w-[90%] mx-auto">

    {/* Payment */}
    <div className="p-3 border-2 m-3 border-pink-300 h-70 w-100 shrink-0">
      <h1>پرداخت</h1>

      <RegisterCart />

      <button
        onClick={payFor}
        className="rounded-xl bg-rose-500 cursor-pointer text-white font-bold m-5 p-3"
      >
        ثبت سفارش
      </button>
    </div>


    {/* Cart */}
    <div className="p-5 m-3 shadow-2xl flex-1">

      <h1 className="mb-5">
        سبد خرید
      </h1>

      {cart.map((product) => (

        <div
          dir="rtl"
          key={product.id}
          className="flex items-center gap-5 border-b border-gray-200 py-4"
        >

          {/* Image */}
          <div className="shrink-0">

            <Image
              className="border-2 border-pink-100 m-2"
              src={product.image}
              width={100}
              height={100}
              alt={product.title}
            />

          </div>


          {/* Product information */}
          <div className="flex-1">

            <p className="mb-3">
              <span>نام کالا: </span>
              {product.title}
            </p>

            <p className="mb-3">
              <span>قیمت: </span>
              {product.price}
              <span> تومان</span>
            </p>


            {/* Quantity */}
            <p className="flex items-center">

              <span>تعداد: </span>

              <button
                onClick={() =>
                  decrement(Number(product.id))
                }
                className="cursor-pointer px-3 py-2 m-2 rounded-2xl bg-yellow-300 font-bold"
              >
                -
              </button>

              {product.count}

              <button
                onClick={() =>
                  increment(Number(product.id))
                }
                className="cursor-pointer py-2 px-3 m-2 rounded-2xl bg-green-500 font-bold"
              >
                +
              </button>

            </p>

          </div>


          {/* Delete */}
          <div className="shrink-0">

            <button
              className="cursor-pointer text-red-600 p-2 border-2 border-red-400 rounded-lg hover:bg-red-400 hover:text-white m-3"
              onClick={() =>
                deleteProduct(Number(product.id))
              }
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>
);





  

  // return (
  //   <div className="flex justify-center gap-8 w-[90%]">

  //     {/* Payment */}
  //     <div className="p-3 border-2 m-3 border-pink-300 h-70 w-100">

  //       <h1>پرداخت</h1>

  //       <RegisterCart />

  //       <button
  //         onClick={payFor}
  //         className="rounded-xl bg-rose-500 cursor-pointer text-white font-bold m-5 p-3"
  //       >
  //         ثبت سفارش
  //       </button>

  //     </div>


  //     {/* Cart */}
  //     <div className="p-5 m-3 shadow-2xl">

  //       <h1>سبد خرید</h1>

  //       {cart.map((product) => (

  //         <div
  //           dir="rtl"
  //           key={product.id}
  //           className="flex justify-center items-center"
  //         >

  //           <div>

  //             <Image
  //               className="border-2 border-pink-100 m-5"
  //               src={product.image}
  //               width={100}
  //               height={100}
  //               alt={product.title}
  //             />


  //             <div className="p-4">

  //               <p>
  //                 <span>نام کالا: </span>
  //                 {product.title}
  //               </p>


  //               <p>
  //                 <span>قیمت: </span>
  //                 {product.price}
  //                 <span> تومان</span>
  //               </p>


  //               <p>

  //                 <span>تعداد: </span>


  //                 <button
  //                   onClick={() =>
  //                     decrement(Number(product.id))
  //                   }
  //                   className="cursor-pointer px-3 py-2 m-2 rounded-2xl bg-yellow-300 font-bold"
  //                 >
  //                   -
  //                 </button>


  //                 {product.count}


  //                 <button
  //                   onClick={() =>
  //                     increment(Number(product.id))
  //                   }
  //                   className="cursor-pointer py-2 px-3 m-2 rounded-2xl bg-green-500 font-bold"
  //                 >
  //                   +
  //                 </button>

  //               </p>


  //             </div>


  //             <button
  //               className="cursor-pointer text-red-600 p-2 border-2 border-red-400 rounded-lg hover:bg-red-400 hover:text-white m-3"
  //               onClick={() =>
  //                 deleteProduct(Number(product.id))
  //               }
  //             >
  //               Delete
  //             </button>

  //           </div>

  //         </div>

  //       ))}

  //     </div>

  //   </div>
  // );
}

export default CartDetails;

















// 'use client'

// import { CartContext } from "@/context/CartContext";
// import { useContext, useState,useEffect } from "react";
// import Image from "next/image";
// import RegisterCart from "./RegisterCart";
// import { useRouter,useParams } from "next/navigation";


// function  CartDetails() {
//   const router=useRouter();
//   const params=useParams();
//   const id=params.id;


//     const [loading, setLoading] = useState(true);
  
//     const [payStatus,setPayStatus]=useState<string>("")
  

//     const {cart,setCart}=useContext(CartContext)

// useEffect(() => {
//   const loadCart = async () => {
//     const userID = localStorage.getItem("userID");

//     if (!userID) {
//       setLoading(false);
//       return;
//     }

//     const res = await fetch(
//       `/api/cartItems?userID=${JSON.parse(userID)}`
//     );

//     const data = await res.json();

//     setCart(data.items);
//     setLoading(false);
//   };

//   loadCart();
// }, [setCart]);  

//     if (loading) {
//   return <p>در حال دریافت سبد خرید...</p>;
// }

// if (cart.length === 0) {
//   return <p>سبد کالای شما خالی است</p>;
// }




//   const payfor = async () => {
//   const loggedInId = localStorage.getItem("userID");

//   if (
//     loggedInId &&
//     JSON.parse(loggedInId) === Number(id)
//   ) {
//     await RegisterInDatabase();

//     router.push("/cart/payment");
//   } else {
//     router.push("/login");
//   }
// };

// const RegisterInDatabase = async () => {
//   const data = await fetch("/api/invoices", {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       id: Date.now(),
//       userID: Number(id),
//       items: cart,
//       status: "pending",
//     }),
//   });

//   const response = await data.json();

//   if (data.ok) {
//     setPayStatus("pending");
//   }

//   return response;
// };

// const increment=(code:number)=>{
 
//    setCart(
//     (prev)=>prev.map((item)=>item.id===code?{...item,count:item.count+1}:item)
//    )
// }
// const decrement=(code:number)=>{
 
//    setCart(
//     (prev)=>prev.map((item)=>item.id===code && item.count>1?{...item,count:item.count-1}:item)
//    )
// }
//     return ( 
//         <>
//         <div className="flex justify-center  gap-8 w-[90%]">
        
//     <div className=" p-3 border-2 m-3 border-pink-300 h-70 w-100">
//       <h1>
//         پرداخت
//       </h1>
//       <RegisterCart/>

      
//       <button onClick={payfor}
//        className="rounded-xl bg-rose-500 cursor-pointer text-white font-bold m-5 p-3">
//          ثبت سفارش
//           </button>
//     </div>

//      <div  className="p-5 m-3 shadow-2xl">
//       <h1>سبد خرید</h1>

//       {cart.map((product) => (
//         <div dir="rtl" key={product.id} className="flex justify-center items-center ">
//            <div>
//            <Image className="border-2 border-pink-100 m-5" src={product.image} width={100 } height={100} alt={product.title}/>
//           <div className="p-4" id="productDetailStyle">
//           <p>
//              <span>نام کالا: </span>
//             {product.title}
             
//             </p>
//           <p>
//             <span>قیمت: </span>
//             {product.price}
//             <span>تومان</span>
//             </p>
         
          
//           <p>
//              <span>تعداد</span>
//             <span className="cursor-pointer px-3 py-2 m-2 rounded-2xl bg-yellow-300 font-bold" onClick={()=>decrement(Number(product.id))}>-</span>
            
//             {product.count}

//             <span className=" cursor-pointer py-2 px-3 m-2 rounded-2xl bg-green-500 font-bold" onClick={()=>increment(Number(product.id))}>+</span>
//             </p>
          
//           </div>
//           <div className="cursor-pointer text-red-600 p-2 border-2 border-red-400 rounded-lg items-center justify-center flex hover:bg-red-400 hover:border-0 hover:text-white m-3"
//            onClick={()=>deleteProduct(Number(product.id))}>Delete</div>
//           </div>
          
//         </div>
//       ))}
//     </div>
//     </div>
//         </>
//      );
// }

// export default CartDetails;