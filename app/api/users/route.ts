
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: دریافت همه کاربران
export async function GET() {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}


// POST: ایجاد کاربر جدید
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, name, email, password, role } = body;

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id,
          name,
          email,
          password,
          role: role || "user",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });

  } catch {
    return NextResponse.json(
      { error: "اطلاعات ارسال شده صحیح نیست" },
      { status: 400 }
    );
  }
}

