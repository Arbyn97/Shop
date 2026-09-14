

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select("*");

    if (error) {
      console.error(error);

      return NextResponse.json(
        { message: "خطا در دریافت سفارش‌ها", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در دریافت سفارش‌ها" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newInvoice = await request.json();

    const { data, error } = await supabase
      .from("invoices")
      .insert([newInvoice])
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: "خطا در ایجاد سفارش",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Invoice created successfully",
        invoice: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در ایجاد سفارش" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("invoices")
      .update({
        status: body.status,
      })
      .eq("userID", body.userID)
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: "خطا در تغییر وضعیت سفارش",
          error: error.message,
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "سفارش پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "وضعیت سفارش تغییر کرد",
      invoice: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در تغییر وضعیت سفارش" },
      { status: 500 }
    );
  }
}
