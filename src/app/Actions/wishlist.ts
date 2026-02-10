"use server"

import { getUserToken } from "@/app/Actions/auth"

export async function getWishAction() {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: { token: token! },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function deleteWishItemAction(productId: string) {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
    {
      method: "DELETE",
      headers: { token: token! }
    }
  );

  return response.json();
}

export async function addToWishAction(productId: string) {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        token: token!
      }
    }
  );

  return response.json();
}
