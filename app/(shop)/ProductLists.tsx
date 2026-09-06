import AddCartButton from "@/components/AddcartButton";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type CartsProps = {
  details: Product[];
};

function ProductLists({details}:CartsProps) {
    return (  
    <>
    <div className="grid lg:grid-cols-4 sm:grid-cols-3  ">
    {details.map(product =>{return <div key={product.id} className="m-5 shadow-xl 
          justify-center flex flex-col 
          items-center">
      <Link href={`/details/${product.id}`} target="_blank">
      <div className=" p-2 min-h-100">
        <div  className=" flex-row items-center justify-center p-3 ">
      <p>
         <span className="font-bold m-1 text-xl">نام محصول: </span>
        {product.title}
        </p>
      <p>
         <span className="font-bold m-1 text-xl">قیمت محصول: </span>
        {product.price}
         <span className="font-bold m-1 text-xl">تومان </span>
        </p>
        </div>
        <div className=" mt-5 max-h-60 flex justify-center ">
      <Image src={product.image} width={300 } height={100} alt={product.title}/>
      </div>
      </div>
      </Link>
        <div className="justify-center items-center flex  p-3 m-3">
      <AddCartButton data={product}/>
      </div>
      </div>} )}
      </div>
    </>);
}

export default ProductLists;