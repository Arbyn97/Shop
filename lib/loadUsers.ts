async function findUser(email:string) {
    const response= await fetch("/api/users")
    
    const data =await response.json()
    const result =data.find(item=>item.email===email)
    
    return result
}

export default findUser;
