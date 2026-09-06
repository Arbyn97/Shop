'use client'

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CartDetails from "@/components/CartDetails";

function RedirectToLogin() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {

    const loggedInUserID =
      localStorage.getItem("userID");

    const urlUserID = String(params.id);

    // اگر Login نکرده
    if (!loggedInUserID) {
      localStorage.removeItem("cart");
      router.replace("/login");
      return;
    }

    // تبدیل مقدار localStorage
    const parsedUserID =
      String(JSON.parse(loggedInUserID));

    // اگر URL متعلق به کاربر دیگری است
    if (parsedUserID !== urlUserID) {

      localStorage.removeItem("cart");
      localStorage.removeItem("userID");
      

      router.replace("/login");

      return;
    }

  }, [params.id, router]);


  return (
    <>
      {/* <h1>داشبورد کاربر</h1> */}
      <div>
        <CartDetails/>
        </div>
    </>
  );
}

export default RedirectToLogin;