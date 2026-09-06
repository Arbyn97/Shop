import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const filePath = path.join(
      process.cwd(),
      "data",
      "cartItems.json"
    );

    const file = await fs.readFile(
      filePath,
      "utf-8"
    );

    const cartItems = JSON.parse(file);

    const existingCart = cartItems.find(
      (item: any) => item.userID === body.userID
    );

    if (existingCart) {
      return NextResponse.json(
        {
          message: "Cart already exists",
          cart: existingCart,
        },
        { status: 200 }
      );
    }

    const newCart = {
      userID: body.userID,
      items: body.items,
    };

    cartItems.push(newCart);

    await fs.writeFile(
      filePath,
      JSON.stringify(cartItems, null, 2)
    );

    return NextResponse.json(
      {
        message: "Cart created",
        cart: newCart,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "error in cart" },
      { status: 500 }
    );
  }
}


export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);

    const userID = Number(
      searchParams.get("userID")
    );


    const filePath = path.join(
      process.cwd(),
      "data",
      "cartItems.json"
    );


    const file = await fs.readFile(
      filePath,
      "utf-8"
    );


    const cartItems = JSON.parse(file);


    const userCart = cartItems.find(
      (item: any) => item.userID === userID
    );


    if (!userCart) {

      return NextResponse.json({
        userID,
        items: [],
      });

    }


    return NextResponse.json(userCart);


  } catch (error) {

    return NextResponse.json(
      {
        message: "error getting cart",
      },
      {
        status: 500,
      }
    );

  }
}



export async function PUT(request: Request) {
  try {

    const body = await request.json();
    
    const filePath = path.join(
      process.cwd(),
      "data",
      "cartItems.json"
    );

    const file = await fs.readFile(
      filePath,
      "utf-8"
    );

    const cartItems = JSON.parse(file);

    const cartIndex = cartItems.findIndex(
      (item: any) =>
        item.userID === body.userID
    );

    if (cartIndex === -1) {

      // اگر کاربر هنوز سبد ندارد
      cartItems.push({
        userID: body.userID,
        items: body.items,
      });

    } else {

      // اگر قبلاً سبد دارد
      cartItems[cartIndex].items = body.items;

    }

    await fs.writeFile(
      filePath,
      JSON.stringify(cartItems, null, 2)
    );

    return NextResponse.json({
      message: "Cart updated",
    });

  } catch (error) {

    return NextResponse.json(
      {
        message: "Error updating cart",
      },
      {
        status: 500,
      }
    );

  }
}