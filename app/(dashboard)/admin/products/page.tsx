// 'use client'

// import Image from "next/image";

// import { useEffect, useState } from "react";

// function ManageProducts() {
//     const [products,setProducts]=useState([])
//     const [showModal,setShowModal]=useState({editPrice:false, editTitle:false})
//     const [updateProduct,setUpdateProduct]=useState({price:0,title:""})
//     const [errorMessageUpdate,serErrorMessageUpdate]=useState("")
//     const [selectedProduct,setSelectedProduct]=useState<any>(null)
//         useEffect(()=>{
//             const  fetchData=async()=>{
//                     const data=await fetch("/api/products");
//                     const response=await data.json();
//                     console.log(response)
//                     setProducts(response)
//             }
//             fetchData();

//         },[])

// const hndldelete=async(id)=>{
//      const data=await fetch("/api/products",{
//         method:"DELETE",
//         body:JSON.stringify({
//             id:id
//         })
//      });
//     const response=await data.json();
//     console.log(response)
//     if(data.ok){
//         setProducts(
//             (prev)=>prev.filter((item:any)=>item.id !==id)
//         )
//     }

// }



// const hndleEditPrice=async(id)=>{
      

//      if (!updateProduct.price) {
//     serErrorMessageUpdate("لطفا قیمت را وارد نمایید");
//     return;
//   }

//          const data=await fetch("/api/products",{
//         method:"PUT",
//         body:JSON.stringify({
//             id:id,
//             price:updateProduct.price
//         })
//      });
//     const response=await data.json();
//     console.log(response)

 

//     if(data.ok){
//         console.log("done")
//       setProducts((prev) =>
//   prev.map((item) =>
//     item.id === id
//       ? { ...item, price: updateProduct.price }
//       : item
//   )
// );
//        alert("تغییر قیمت کالا با موفقیت انجام شد")  
//     }
   
 

     

// }
// const hndleEditTitle=async(id)=>{

//      if (!updateProduct.title) {
//     serErrorMessageUpdate("لطفا عنوان کالا را وارد نمایید");
//     return;
//   }

//      const data=await fetch("/api/products",{
//         method:"PUT",
//         body:JSON.stringify({
//             id:id,
//             title:updateProduct.title
//         })
//      });
//     const response=await data.json();
//     console.log(response)


    

//     if(data.ok){
//         console.log("done")
//        setProducts((prev) =>
//   prev.map((item) =>
//     item.id === id
//       ? { ...item, title: updateProduct.title }
//       : item
//   )
// );
//        alert("تغییر نام کالا با موفقیت انجام شد")  
//     }
   


          

// }
    
//     return (
//         <>
//         <div>
//         <table>
//             <thead>
//                 <tr>
                 
//                   <th>نام</th>
//                   <th>قیمت</th>
//                    <th>تصویر</th>
                  
//                   </tr>
//             </thead>
           
//             <tbody>

//                     {products.map((product)=>{
//                     return(
//                         <tr key= {product.id}>
                        
//                         <td>
//                              {product.title}
//                               <span style={{padding:"8px"}} onClick={() => {setShowModal({editTitle:true,editPrice:false}),setSelectedProduct(product)}}  className="cursor-pointer">Edit</span>
//                         </td>
//                         <td >
//                              {product.price}
//                              <span style={{padding:"8px"}}  onClick={() => {setShowModal({editPrice:true,editTitle:false}),setSelectedProduct(product)}}  className="cursor-pointer">Edit</span>
//                         </td>
//                         <td>
//                           <Image src={product.image} width="50" height="50" />
//                         </td>
//                         <td onClick={()=>hndldelete(product.id)} className="cursor-pointer">
//                             Delete
//                         </td>
//                          {/* <td onClick={() => {setShowModal(true),hndleEdit(id)}}  className="cursor-pointer">
//                             Edit
//                         </td> */}
//                         </tr>
//                     )
//                 })}
           

//             </tbody>
            
         
           
//         </table>

//                 {showModal.editPrice && (
//                     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    
//                       <div className="bg-white w-1/2 p-6 rounded-lg">
      
//                         <h2>ویرایش محصول</h2>
//                         <div className="flex flex-col m-auto items-center justify-center">
                            
//                         <Image src={selectedProduct.image} width={100} height={100} alt="choose photo" className="border-1 border-gray-300"/>

                       

//                         <input type="text" placeholder="قیمت" className="m-2 rounded-xl border-2 border-pink-300"
                        
//                                      onChange={(e) =>setUpdateProduct((prev) => ({...prev,price: Number(e.target.value) }))}/>
//                                         <p className="text-red-500">{errorMessageUpdate}</p>
                        
//                         <div className="p-3">
//                         <button onClick={() => setShowModal({editPrice:false,editTitle:false})} className="hover:bg-red-300 px-6 py-2 rounded-2xl text-2xl border-2 border-red-300 mr-3">
//                             لغو 
//                         </button>
                        
//                         <button onClick={() => {hndleEditPrice(selectedProduct.id),setShowModal({editPrice:false,editTitle:false})}} className="hover:border-green-400/50 px-6 py-2 rounded-2xl text-2xl hover:bg-white hover:border-2 bg-green-400/50">
//                             ذخیره                       
//                         </button>
//                         </div>

//                         </div>

//                       </div>

//                     </div>
//                 )}

//                 {showModal.editTitle && (
//                     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    
//                       <div className="bg-white w-1/2 p-6 rounded-lg">
      
//                         <h2>ویرایش محصول</h2>
//                         <div className="flex flex-col m-auto items-center justify-center">
                            
//                         <Image src={selectedProduct.image} width={100} height={100} alt="choose photo" className="border-1 border-gray-300"/>

//                         <input type="text" placeholder="نام محصول" className="m-2 rounded-xl border-2 border-pink-300" 
//                                    onChange={(e) =>setUpdateProduct((prev) => ({...prev,title: e.target.value }))}/>
//                                    <p className="text-red-500">{errorMessageUpdate}</p>

//                         <div className="p-3">
//                         <button onClick={() => setShowModal({editPrice:false,editTitle:false})} className="hover:bg-red-300 px-6 py-2 rounded-2xl text-2xl border-2 border-red-300 mr-3">
//                             لغو 
//                         </button>
                        
//                         <button onClick={() => {hndleEditTitle(selectedProduct.id),setShowModal({editPrice:false,editTitle:false})}} className="hover:border-green-400/50 px-6 py-2 rounded-2xl text-2xl hover:bg-white hover:border-2 bg-green-400/50">
//                             ذخیره                       
//                         </button>
//                         </div>

//                         </div>

//                       </div>

//                     </div>
//                 )}

//         </div>
//         </>
//       );
// }

// export default ManageProducts;




'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

function ManageProducts() {

  const [products, setProducts] = useState<any[]>([]);

  const [showModal, setShowModal] = useState({
    editPrice: false,
    editTitle: false
  });

  const [updateProduct, setUpdateProduct] = useState({
    price: 0,
    title: ""
  });

  const [errorMessageUpdate, setErrorMessageUpdate] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<any>(null);


  useEffect(() => {

    const fetchData = async () => {

      const data = await fetch("/api/products");
      const response = await data.json();

      setProducts(response);

    };

    fetchData();

  }, []);


  const hndldelete = async (id: number) => {

    const data = await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      })
    });

    const response = await data.json();

    console.log(response);

    if (data.ok) {

      setProducts((prev) =>
        prev.filter((item: any) => item.id !== id)
      );

    }

  };


  const hndleEditPrice = async (id: number) => {

    if (!updateProduct.price) {

      setErrorMessageUpdate("لطفا قیمت را وارد نمایید");
      return;

    }

    const data = await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        price: updateProduct.price
      })
    });

    const response = await data.json();

    console.log(response);


    if (data.ok) {

      setProducts((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, price: updateProduct.price }
            : item
        )
      );

      setShowModal({
        editPrice: false,
        editTitle: false
      });

      setErrorMessageUpdate("");

      alert("تغییر قیمت کالا با موفقیت انجام شد");

    }

  };


  const hndleEditTitle = async (id: number) => {

    if (!updateProduct.title) {

      setErrorMessageUpdate("لطفا عنوان کالا را وارد نمایید");
      return;

    }

    const data = await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: updateProduct.title
      })
    });

    const response = await data.json();

    console.log(response);


    if (data.ok) {

      setProducts((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, title: updateProduct.title }
            : item
        )
      );

      setShowModal({
        editPrice: false,
        editTitle: false
      });

      setErrorMessageUpdate("");

      alert("تغییر نام کالا با موفقیت انجام شد");

    }

  };


  return (

    <div dir="rtl" className="p-5">

      {/* عنوان صفحه */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          مدیریت کالاها
        </h1>

        <p className="mt-2 text-gray-500">
          مشاهده، ویرایش و حذف کالاها
        </p>

      </div>


      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-md">

        <table className="w-full text-right">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 font-bold text-gray-700">
                نام کالا
              </th>

              <th className="px-6 py-4 font-bold text-gray-700">
                قیمت
              </th>

              <th className="px-6 py-4 text-center font-bold text-gray-700">
                تصویر
              </th>

              <th className="px-6 py-4 text-center font-bold text-gray-700">
                عملیات
              </th>

            </tr>

          </thead>


          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t border-gray-100 transition hover:bg-gray-50"
              >

                {/* Title */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <span className="font-semibold text-gray-800">
                      {product.title}
                    </span>

                    <button
                      onClick={() => {
                        setShowModal({
                          editTitle: true,
                          editPrice: false
                        });

                        setSelectedProduct(product);

                        setErrorMessageUpdate("");
                      }}
                      className="rounded-lg px-3 py-1 text-sm text-blue-500 transition hover:bg-blue-50"
                    >
                      ویرایش
                    </button>

                  </div>

                </td>


                {/* Price */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <span className="font-semibold text-gray-700">
                      {product.price}
                    </span>

                    <button
                      onClick={() => {
                        setShowModal({
                          editPrice: true,
                          editTitle: false
                        });

                        setSelectedProduct(product);

                        setErrorMessageUpdate("");
                      }}
                      className="rounded-lg px-3 py-1 text-sm text-blue-500 transition hover:bg-blue-50"
                    >
                      ویرایش
                    </button>

                  </div>

                </td>


                {/* Image */}

                <td className="px-6 py-5">

                  <div className="flex justify-center">

                    <Image
                      src={product.image}
                      width={60}
                      height={60}
                      alt={product.title}
                      className="rounded-xl border border-gray-200 object-cover"
                    />

                  </div>

                </td>


                {/* Delete */}

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() => hndldelete(product.id)}
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    حذف
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Edit Price Modal */}

      {showModal.editPrice && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              ویرایش قیمت کالا
            </h2>


            <div className="flex flex-col items-center">

              <Image
                src={selectedProduct.image}
                width={100}
                height={100}
                alt={selectedProduct.title}
                className="mb-5 rounded-2xl border border-gray-200 object-cover"
              />


              <input
                type="number"
                placeholder="قیمت جدید"
                className="w-full rounded-xl border-2 border-gray-200 p-3 text-right outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                onChange={(e) =>
                  setUpdateProduct((prev) => ({
                    ...prev,
                    price: Number(e.target.value)
                  }))
                }
              />


              <p className="mt-2 self-start text-sm text-red-500">
                {errorMessageUpdate}
              </p>


              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => {
                    setShowModal({
                      editPrice: false,
                      editTitle: false
                    });

                    setErrorMessageUpdate("");
                  }}
                  className="rounded-xl border-2 border-gray-200 px-6 py-2 text-lg text-gray-600 transition hover:bg-gray-100"
                >
                  لغو
                </button>


                <button
                  onClick={() =>
                    hndleEditPrice(selectedProduct.id)
                  }
                  className="rounded-xl bg-green-400/70 px-6 py-2 text-lg font-semibold text-gray-800 transition hover:bg-green-400"
                >
                  ذخیره
                </button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* Edit Title Modal */}

      {showModal.editTitle && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              ویرایش نام کالا
            </h2>


            <div className="flex flex-col items-center">

              <Image
                src={selectedProduct.image}
                width={100}
                height={100}
                alt={selectedProduct.title}
                className="mb-5 rounded-2xl border border-gray-200 object-cover"
              />


              <input
                type="text"
                placeholder="نام جدید محصول"
                className="w-full rounded-xl border-2 border-gray-200 p-3 text-right outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                onChange={(e) =>
                  setUpdateProduct((prev) => ({
                    ...prev,
                    title: e.target.value
                  }))
                }
              />


              <p className="mt-2 self-start text-sm text-red-500">
                {errorMessageUpdate}
              </p>


              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => {
                    setShowModal({
                      editPrice: false,
                      editTitle: false
                    });

                    setErrorMessageUpdate("");
                  }}
                  className="rounded-xl border-2 border-gray-200 px-6 py-2 text-lg text-gray-600 transition hover:bg-gray-100"
                >
                  لغو
                </button>


                <button
                  onClick={() =>
                    hndleEditTitle(selectedProduct.id)
                  }
                  className="rounded-xl bg-green-400/70 px-6 py-2 text-lg font-semibold text-gray-800 transition hover:bg-green-400"
                >
                  ذخیره
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default ManageProducts;