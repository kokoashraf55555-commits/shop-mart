"use server"

import { getUserToken } from "@/app/Actions/auth"

export async function getWishAction() {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token: token!,
      },
      cache: "no-store",
    }
  );

  return response.json();
}
