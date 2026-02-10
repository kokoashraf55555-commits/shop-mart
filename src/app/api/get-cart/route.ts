import { NextResponse } from 'next/server';
import { CartResponse } from "@/interfaces"

export async function GET () {
       const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODc1NTQ2Y2JkOTk0NTMzM2MzNDcyYSIsIm5hbWUiOiJraXJvbG9zIEFzaHJhZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwNTYzNjE5LCJleHAiOjE3NzgzMzk2MTl9.WCFYZCgzy-8Z0P4LCJK9BrOSEpq7C7glJcuuI21gMlw",
                }
            })
            const data: CartResponse = await response.json()
            return NextResponse.json(data)
}