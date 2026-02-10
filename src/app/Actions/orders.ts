"use server";

import { getUserToken } from "./auth";



type ShippingAddress = {
  details?: string;
  city?: string;
  phone?: string;
};

export async function checkoutSessionAction(
  cartId: string,
  shippingAddress: ShippingAddress
) {
  const token = await getUserToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token!,
      },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  return res.json();
}

export async function createCashOrderAction(
  cartId: string,
  shippingAddress: ShippingAddress
) {
  const token = await getUserToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token!,
      },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  return res.json();
}
