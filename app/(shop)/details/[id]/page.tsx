

import Image from "next/image";


  type Props = {
  params: Promise<{
    id: string;
  }>;
};


export type Product = {
  id: number;
  title: string;
  price: number;
  image:string
};

import AddCartButton from "../../../../components/AddcartButton";
import { allProducts } from "@/lib/allProducts";
async function ProductDetails({ params }: Props) {
   const { id } = await params;
  

// const res = await fetch("http://localhost:3000/api/products");

// const data :Product[]= await res.json();
// const result =data.find(item=>item.id===Number(id))
const data: Product[] = await allProducts();

const result = data.find(
    item => item.id === Number(id)
);

if (!result) {
  return <h1>Product not found</h1>;
}

    return (  
        <>
       
        <div className="m-5 shadow-2xl lg:max-w-4xl lg:justify-center lg:items-center lg:mx-auto">
          <div className="flex lg:m-30">
           <div className="flex border-2 flex-2/5 border-pink-100 p-2 justify-center">
            <Image   src={result.image} width={300 } height={300} alt={result.title}/>
           </div>
            <div dir="rtl" className=" mt-10 flex-2/5 p-4  lg:m-0 lg:ml-6">
            <p  className="text-xl">
              <span className="font-bold m-1 text-3xl">نام محصول: </span>
                 {result.title}
            </p>
            <p className="text-xl">
              <span className="font-bold m-1 text-3xl">قیمت محصول: </span>
                {result.price}
                <span className="font-bold m-1 text-3xl">تومان </span>
            </p>
            
            </div>
            
            </div>
        <div className="justify-center items-center flex  p-3 m-3">
           
            <AddCartButton data={result}/>
           </div>
          
        </div>
        </>
    );
}

export default ProductDetails;
