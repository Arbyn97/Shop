'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children}: {
  children: React.ReactNode;}) {
   
   const router=useRouter()
   const handleLogout = () => {
    localStorage.removeItem("admin");

    router.push("/");
};
    return (
       
        <>
         <div className="flex min-h-screen bg-gray-200/20 m-5">

      {/* Sidebar */}
      <div
        id="admin-header"
        className="flex w-64 flex-col items-center border-r-8 border-white p-5"
      >

        {/* Admin profile */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-t from-pink-300/35 to-pink-300 outline-1 outline-pink-200">
          </div>

          <p className="mt-2 font-bold whitespace-nowrap">
            نام ادمین
          </p>
        </div>

        {/* Menu */}
        <div className="mt-10 w-full space-y-4 text-center">

          <p>
            <Link href="/admin">
              صفحه اصلی
            </Link>
          </p>

          <p>
            <Link href="/admin/users">
              لیست کاربران
            </Link>
          </p>

          <p>
            <Link href="/admin/products">
              لیست کالاها
            </Link>
          </p>

          <p>
            <Link href="/admin/invoices">
              سفارشات
            </Link>
          </p>

        </div>

        {/* Logout */}
        <div className="mt-auto">
          <p className="cursor-pointer" onClick={handleLogout}>
            خروج
          </p>
        </div>

      </div>

      {/* Main content */}
      <div className="flex-1 p-5">
        {children}
      </div>

    </div>
        </>
      );
};