"use server"
import { getUserToken } from '@/app/Actions/auth';


export async function addAddressAction(body: {
  name?: string
  details?: string
  phone?: string
  city?: string
}) {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token!,
      },
      body: JSON.stringify(body),
    }
  )

  return response.json()
}
