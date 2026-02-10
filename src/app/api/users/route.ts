import { NextResponse } from "next/server"

export async function GET(){
const users={
     message:'success',
   users:[
   
    {id:243,name:'Jonh',age:20},
    {id:753,name:'Joy',age:23},
    {id:222,name:'mark',age:26},
    {id:542,name:'jessy',age:19},
    {id:754,name:'jack',age:32}
]}
return NextResponse.json(users)
}