

'use client'

import { useEffect, useState } from "react";


type InvoiceItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  count: number;
};

type Invoice = {
  id: number;
  userID: string;
  status: string;
   items:  InvoiceItem[];
  // بقیه فیلدهای invoice
};





function InvoicesList() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        const fetchList = async () => {
            const response = await fetch("/api/invoices");
            const data = await response.json();

            setInvoices(data);
        };

        fetchList();
    }, []);

    return (
        <div className="w-full p-6">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                مدیریت فاکتورها
            </h1>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-right">

                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>

                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    شماره فاکتور
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    کد کاربر
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    آیتم‌های خرید
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    وضعیت سفارش
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    عملیات
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {invoices.map((invoice) => {
                                return (
                                    <tr
                                        key={invoice.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >

                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                            {invoice.id}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {invoice.userID}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {invoice.items.length} 
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`
                                                inline-block
                                                px-3 py-1
                                                rounded-full
                                                text-sm
                                                font-medium
                                                ${
                                                    invoice.status === "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }
                                                `}
                                            >
                                                {invoice.status === "paid"
                                                    ? "پرداخت شده"
                                                    : "در انتظار پرداخت"}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <button
                                                className="
                                                px-4 py-2
                                                rounded-xl
                                                border-2 border-red-300
                                                text-red-500
                                                hover:bg-red-500
                                                hover:text-white
                                                transition-all duration-300
                                                "
                                            >
                                                حذف
                                            </button>

                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default InvoicesList;
