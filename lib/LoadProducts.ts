export default async function getProducts(){
    const response=await fetch("/api/products")
     if (!response.ok) {
    throw new Error("نتونستم کالا ها رو دریافت کنم");
  }
return response.json();
}