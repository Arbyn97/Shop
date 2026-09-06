import loadUsers from "@/lib/loadUsers"

export async function findUser(email:string,password:string) {
   const user= await loadUsers(email)
   if(!user){
   return{message:"ایمیل وارد شده معتبر نمی باشد",
    success:false,
    failed:true
   } 
   }
if(user.password !==password){
   return {message:"پسورد وارد شده صحیح نمی باشد",
      success:false,
   
   }
}

return { success: true,
  message: "ورود موفق بود",
  failed:false,
  user}
}


