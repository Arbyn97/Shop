import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
       .order("id", { ascending: true });

    if (error) {
      console.error("GET products error:", error);

      return NextResponse.json(
        {
          message: "خطا در دریافت محصولات",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(request: Request) {
  try {
    const newProduct = await request.json();

    const { data: existingProduct, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("id", newProduct.id)
      .maybeSingle();

    if (findError) {
      console.error("Find product error:", findError);

      return NextResponse.json(
        {
          message: "خطا در بررسی محصول",
          error: findError.message,
        },
        { status: 500 }
      );
    }

    if (existingProduct) {
      return NextResponse.json(
        {
          message: "این کالا قبلا ثبت شده است",
        },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select()
      .single();

    if (error) {
      console.error("POST product error:", error);

      return NextResponse.json(
        {
          message: "خطا در افزودن کالا",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "کالا با موفقیت اضافه شد",
        product: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در افزودن کالا" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { data: existingProduct, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("id", body.id)
      .maybeSingle();

    if (findError) {
      console.error("Find product error:", findError);

      return NextResponse.json(
        {
          message: "خطا در پیدا کردن کالا",
          error: findError.message,
        },
        { status: 500 }
      );
    }

    if (!existingProduct) {
      return NextResponse.json(
        { message: "کالا پیدا نشد" },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .update(body)
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      console.error("PUT product error:", error);

      return NextResponse.json(
        {
          message: "خطا در تغییر اطلاعات کالا",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "ویرایش انجام شد",
      product: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در تغییر اطلاعات کالا" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { data: existingProduct, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("id", body.id)
      .maybeSingle();

    if (findError) {
      console.error("Find product error:", findError);

      return NextResponse.json(
        {
          message: "خطا در پیدا کردن کالا",
          error: findError.message,
        },
        { status: 500 }
      );
    }

    if (!existingProduct) {
      return NextResponse.json(
        { message: "کالا پیدا نشد" },
        { status: 404 }
      );
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", body.id);

    if (error) {
      console.error("DELETE product error:", error);

      return NextResponse.json(
        {
          message: "خطا در حذف کالا",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "کالا حذف شد",
      product: existingProduct,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در حذف کالا" },
      { status: 500 }
    );
  }
}
