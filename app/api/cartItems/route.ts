

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data: existingCart, error: findError } = await supabase
      .from("cartItems")
      .select("*")
      .eq("userID", body.userID)
      .maybeSingle();

    if (findError) {
      console.error(findError);

      return NextResponse.json(
        {
          message: "Error finding cart",
          error: findError.message,
        },
        { status: 500 }
      );
    }

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

    const { data, error } = await supabase
      .from("cartItems")
      .insert([newCart])
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: "Error creating cart",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Cart created",
        cart: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error in cart" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json(
        { message: "userID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cartItems")
      .select("*")
      .eq("userID", userID)
      .maybeSingle();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: "Error getting cart",
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({
        userID,
        items: [],
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error getting cart",
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

    const { data: existingCart, error: findError } = await supabase
      .from("cartItems")
      .select("*")
      .eq("userID", body.userID)
      .maybeSingle();

    if (findError) {
      console.error(findError);

      return NextResponse.json(
        {
          message: "Error finding cart",
          error: findError.message,
        },
        { status: 500 }
      );
    }

    if (!existingCart) {
      const { data, error } = await supabase
        .from("cartItems")
        .insert([
          {
            userID: body.userID,
            items: body.items,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);

        return NextResponse.json(
          {
            message: "Error creating cart",
            error: error.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Cart created",
        cart: data,
      });
    }

    const { data, error } = await supabase
      .from("cartItems")
      .update({
        items: body.items,
      })
      .eq("userID", body.userID)
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: "Error updating cart",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Cart updated",
      cart: data,
    });
  } catch (error) {
    console.error(error);

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
