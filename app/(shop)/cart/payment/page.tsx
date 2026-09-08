'use client'

import { useEffect, useState } from "react";

function Payment() {
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        setId(userID);
    }, []);

    const payTotal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = await fetch("/api/invoices", {
            method: "PUT",
            body: JSON.stringify({
                userID: Number(id),
                status: "paid"
            })
        });

        console.log(data);

        if (data.ok) {
            console.log("پرداخت انجام شد");
        }
    };

    return (
        <>
            <form method="POST" onSubmit={payTotal}>
                <input type="text" placeholder="name" />
                <input type="text" placeholder="last name" />
                <input type="text" placeholder="phone" />

                <button type="submit">
                    پرداخت
                </button>
            </form>
        </>
    );
}

export default Payment;
