// 'use client'

// import { useEffect, useState } from "react";

// function manageUsers() {
//     const [users,setUsers]=useState([])
//         useEffect(()=>{
//             const  fetchData=async()=>{
//                     const data=await fetch("/api/users");
//                     const response=await data.json();
//                     console.log(response)
//                     setUsers(response)
//             }
//             fetchData();

//         },[])


    
//     return (
//         <>
//         <div>
//         <table>
//             <thead>
//                 <tr>
                 
//                   <th>نام</th>
//                   <th>ایمیل</th>
//                   <th>عملیات</th>
//                   </tr>
//             </thead>
           
//             <tbody>

//                     {users.map((user)=>{
//                     return(
//                         <tr key= {user.id}>
                        
//                         <td>
//                              {user.name}
//                         </td>
//                         <td>
//                              {user.email}
//                         </td>
//                         <td>
//                             Delete
//                         </td>
//                         </tr>
//                     )
//                 })}
           

//             </tbody>
            
                
           
//         </table>
//         </div>
//         </>
//       );
// }

// export default manageUsers;
'use client'

import { useEffect, useState } from "react";

function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("/api/users");
            const response = await data.json();

            console.log(response);
            setUsers(response);
        };

        fetchData();
    }, []);

    return (
        <div className="w-full p-6">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                مدیریت کاربران
            </h1>

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-right">

                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    نام
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    ایمیل
                                </th>

                                <th className="px-6 py-4 font-semibold text-gray-700">
                                    عملیات
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.map((user) => {
                                return (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >

                                        <td className="px-6 py-4 text-gray-800">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {user.email}
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

export default ManageUsers;