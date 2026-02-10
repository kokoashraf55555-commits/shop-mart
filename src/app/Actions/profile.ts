"use server"

import { getUserToken } from "@/app/Actions/auth"

export async function getAddressesAction() {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      headers: {
        token: token!,
      },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function deleteAddressAction(id: string) {
  const token = await getUserToken()

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses/" + id,
    {
      method: "DELETE",
      headers: {
        token: token!,
      },
    }
  );

  return response.json();
}
