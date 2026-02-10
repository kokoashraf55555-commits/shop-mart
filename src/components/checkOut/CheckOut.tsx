"use client"
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { useSession } from "next-auth/react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { toast } from 'react-hot-toast'
import { checkoutSessionAction, createCashOrderAction } from '@/app/Actions/orders'

export default function CheckOut({ cartId }: { cartId: string }) {

  const router = useRouter()
  const session = useSession()

  let detailsInput = useRef<HTMLInputElement | null>(null)
  let cityInput = useRef<HTMLInputElement | null>(null)
  let phoneInput = useRef<HTMLInputElement | null>(null)

  const token = (session.data as any)?.token

async function CheckoutSession(e: React.MouseEvent) {
  e.preventDefault();

  if (!cityInput.current?.value || !detailsInput.current?.value || !phoneInput.current?.value) {
    toast.error("Please fill all fields");
    return;
  }

  const shippingAddress = {
    details: detailsInput.current?.value,
    city: cityInput.current?.value,
    phone: phoneInput.current?.value,
  };

  const data = await checkoutSessionAction(cartId, shippingAddress);
  console.log(data);

  if (data.status === "success") {
    window.location.href = data.session.url;
  } else {
    toast.error("Checkout failed");
  }
}

async function CreateCashOrder(e: React.MouseEvent) {
  e.preventDefault();

  const shippingAddress = {
    details: detailsInput.current?.value,
    city: cityInput.current?.value,
    phone: phoneInput.current?.value,
  };

  const data = await createCashOrderAction(cartId, shippingAddress);
  console.log(data);

  if (data.status === "success") {
    toast.success("Order placed successfully");
    router.push("/allorders");
  } else {
    toast.error("Order failed");
  }
}



  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='cursor-pointer w-full text-lg mt-4'>
            Proceed to Checkout
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add shipping Address</DialogTitle>
            <DialogDescription>
              👉 Please add a shipping address to complete the delivery
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>City</Label>
              <Input ref={cityInput} id="city" />
            </div>

            <div className="grid gap-3">
              <Label>Details</Label>
              <Input ref={detailsInput} id="details" />
            </div>

            <div className="grid gap-3">
              <Label>Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={CheckoutSession} type="button">
              Visa
            </Button>

            <Button onClick={CreateCashOrder} type="button">
              Cash
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
