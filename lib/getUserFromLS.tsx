'use client'
function getUserFromLocalStorage() {
         if (typeof window === "undefined") {
    return 0;
  }
     const userID=localStorage.getItem("userID")
            
            if(userID){
                return JSON.parse(userID)
            }
            else{
                return 0
            }
}
export default getUserFromLocalStorage;