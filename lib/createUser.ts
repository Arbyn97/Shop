export async function createUser(name:string,email:string,password:string) {
    const newUser={
        id:Date.now(),
        name:name,
        email:email,
        password:password
    }
    const response = await fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(newUser)
    })
     const user = await response.json();

  return user;
}