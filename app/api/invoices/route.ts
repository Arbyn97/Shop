import { NextResponse } from "next/server";
import invoices from "@/data/invoices.json";

import fs from "fs/promises";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "invoices.json"
);

export async function GET() {
   const file = await fs.readFile(filePath, "utf-8");
  const invoices = JSON.parse(file);
  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  const newInvoice = await request.json();

   const file = await fs.readFile(filePath, "utf-8");
  const invoices = JSON.parse(file);

  invoices.push(newInvoice);

  
    await fs.writeFile(
    filePath,
    JSON.stringify(invoices, null, 2)
  );


  return NextResponse.json(
    {
      message: "Invoice created successfully",
      invoice: newInvoice,
    },
    { status: 201 }
  );
}


export async function PUT(req: Request) {
  try { 
    const body = await req.json();

    const filePath = path.join(
      process.cwd(),
      "data",
      "invoices.json"
    );

   const file = await fs.readFile(filePath, "utf-8");
const invoices = JSON.parse(file);

    const invoiceIndex = invoices.findIndex(
      (invoice: any) => invoice.userID === body.userID
    );

    if (invoiceIndex === -1) {
      return NextResponse.json(
        { message: "سفارش پیدا نشد" },
        { status: 404 }
      );
    }

    invoices[invoiceIndex].status = body.status;

   await fs.writeFile(
  filePath,
  JSON.stringify(invoices, null, 2)
);

    return NextResponse.json({
      message: "وضعیت سفارش تغییر کرد",
      invoice: invoices[invoiceIndex],
    });

  } catch (error) {
    return NextResponse.json(
      { message: "خطا در تغییر وضعیت سفارش" },
      { status: 500 }
    );
  }
}