import { NextResponse } from "next/server";
import users from '@/data/users.json'
import fs from "fs/promises";
import path from"path"
const filepath=path.join(process.cwd(),"data","users.json")


export async function GET() {
    return NextResponse.json(users)
    
};

export async function POST(request: Request) {
  
  const newUser = await request.json();
  const file =await fs.readFile(filepath,"utf-8")
  const user=JSON.parse(file)
  user.push(newUser)
  await fs.writeFile(filepath,JSON.stringify(user,null,2))
  return NextResponse.json(newUser);
}