"use server"

import { getUserToken } from "@/app/Actions/auth"

export async function addToCartAction(productId: string) {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        token: token!
      }
    }
  )

  return response.json()
}
export async function getCartAction() {
  const token = await getUserToken()

    const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
         token: token!
      },
      cache: "no-store",
    }
  );

  return response.json();
}
 

export async function deleteCartItemAction(productId: string) {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
    {
      method: "DELETE",
      headers: {
        token: token!
      }
    }
  );

  return response.json();
}

export async function clearCartAction() {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart/",
    {
      method: "DELETE",
      headers: {
        token: token!
      }
    }
  );

  return response.json();
}

export async function updateCartItemAction(productId: string, count: number) {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
    {
      method: "PUT",
      body: JSON.stringify({ count }),
      headers: {
        token: token!,
        "content-type": "application/json"
      }
    }
  );

  return response.json();
}
