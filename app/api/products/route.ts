import { NextResponse } from "next/server";
import products from '@/data/products.json'

import fs from "fs/promises";
import path from "path";


export async function GET() {
    return NextResponse.json(products)
    
}

export async function PUT(request:Request){
    try{
        const body=await request.json();
    const filePath=path.join(
        process.cwd(),
        "data",
        "products.json"
    )
    const file=await fs.readFile(filePath,"utf-8")
    const products=JSON.parse(file)
    const index=products.findIndex((item:any)=>
        item.id===body.id
    )
    if (index === -1) {
          return NextResponse.json(
            { message: "کالا پیدا نشد" },
            { status: 404 }
          );
        }
    
       products[index] = {
  ...products[index],
  ...body
};
       await fs.writeFile(
      filePath,
      JSON.stringify(products, null, 2)
    );
    
        return NextResponse.json({
          message: "ویرایش انجام شد",
          product: products[index],
        });
    
      } catch (error) {
        return NextResponse.json(
          { message: "خطا در تغییر اطلاعات کالا" },
          { status: 500 }
        );
      }

}
export async function DELETE(request:Request){
    try{
        const body=await request.json();
    const filePath=path.join(
        process.cwd(),
        "data",
        "products.json"
    )
    const file=await fs.readFile(filePath,"utf-8")
    const products=JSON.parse(file)

    const existProduct=products.find(
      (item:any)=>
        item.id === body.id
    )

    if(!existProduct)
    {
       return NextResponse.json(

        {  message: "کالا پیدا نشد"},
        {status: 404 },
        );

    }

    const newProducts=products.filter((item:any)=>
        item.id !== body.id
    )
   
    
      
    
       await fs.writeFile(
      filePath,
      JSON.stringify(newProducts, null, 2)
    );
    
        return NextResponse.json({
          message: "کالا حذف شد",
          product: existProduct,
        });
    
      } catch (error) {
        return NextResponse.json(
          { message: "خطا در حذف کالا" }, 
          { status: 500 }
        );
      }
}







export async function POST(request:Request){
    try{
        const newProduct=await request.json();

    const filePath=path.join(
        process.cwd(),
        "data",
        "products.json"
    )
    const file=await fs.readFile(filePath,"utf-8")
    const products=JSON.parse(file)


     const existProduct=products.find(
      (item:any)=>
        item.id === newProduct.id
    )

    if(existProduct)
    {
       return NextResponse.json(

        {  message: "این کالا قبلا ثبت شده است"},
        {status: 403 },
        );

    } 

            products.push(newProduct)

              await fs.writeFile(
              filePath,
              JSON.stringify(products, null, 2)
    );

      return NextResponse.json(
      {
        message: "کالا با موفقیت اضافه شد",
        product: newProduct,
      },
      
        {
          status: 201,
        }
    );



  }catch (error) {
        return NextResponse.json(
          { message: "خطا در افزودن کالا" }, 
          { status: 500 }
        );
      }

}