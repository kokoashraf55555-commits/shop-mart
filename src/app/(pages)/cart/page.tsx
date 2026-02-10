"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from 'lucide-react'
import { cartContext } from '@/components/context/CartContext'
import Loading from '@/app/loading'
import { CartResponse } from '@/interfaces'
import toast from 'react-hot-toast'
import Link from 'next/link'
import CheckOut from '@/components/checkOut/CheckOut'
import AddAddress from '@/components/addAddress/AddAddress'
import {
  deleteCartItemAction,
  clearCartAction,
  updateCartItemAction
} from "@/app/Actions/cart"


export default function Cart() {

 


  const { cartData, isLoading, getCart, setCartData } = useContext(cartContext)
  const [RemovingId, setRemovingId] = useState<null | string>(null)
  const [updatingId, setupdatingId] = useState<null | string>(null)
  const [isClearing, setIsClearing] = useState<boolean>(false)

  useEffect(() => {
    getCart()
  }, [])

  if (isLoading) return <Loading />

  if (cartData && cartData.data.products.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <p className="text-xl font-semibold mb-4">
          Your Cart Is Empty
        </p>

        <Link href={'/products'}>
          <Button className="rounded-xl px-4 py-5 text-md">
            Add items
          </Button>
        </Link>
      </div>
    )
  }



 async function deleteCartItem(productId: string) {
  setRemovingId(productId)

  const data = await deleteCartItemAction(productId)

  if (data.status === "success") {
    toast.success("Product deleted successfully")
    setCartData(data)
  }

  setRemovingId(null)
}


async function clearCart() {
  setIsClearing(true)

  const data = await clearCartAction()

  if (data.message === "success") {
    toast.success("Your Cart Cleared Successfully")
    setCartData({
  status: "success",
  cartId: data.cartId || "",
  numOfCartItems: 0,
  data: {
    _id: "",            
    cartOwner: "",       
    products: [],
    totalCartPrice: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }
})

  }

  setIsClearing(false)
}

 async function updateCartItem(productId: string, count: number) {
  setupdatingId(productId)

  const data = await updateCartItemAction(productId, count)

  if (data.status === "success") {
    toast.success("Updated product quantity")
    setCartData(data)
  }

  setupdatingId(null)
}


  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
      <p className='text-muted-foreground mt-1'>
        {cartData?.numOfCartItems} items in your cart
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">

        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartData?.data.products.map((item) => (
            <div key={item._id}
              className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">

              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
              />

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                  <div>
                    <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                      {item.product.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      {item.product.brand.name} • {item.product.category.name}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">
                      EGP {item.price}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <button
                      disabled={item.count == 1}
                      onClick={() => updateCartItem(item.product.id, item.count - 1)}
                      className='size-8 cursor-pointer rounded-lg border hover:bg-accent'>
                      -
                    </button>

                    <span className='w-6 text-center font-medium'>
                      {updatingId == item.product.id
                        ? <Loader2 className='animate-spin' />
                        : item.count}
                    </span>

                    <button
                      onClick={() => updateCartItem(item.product.id, item.count + 1)}
                      className='size-8 cursor-pointer rounded-lg border hover:bg-accent'>
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => deleteCartItem(item.product.id)}
                    className='text-sm cursor-pointer text-destructive hover:underline'>
                    {RemovingId == item.product.id &&
                      <Loader2 className='animate-spin' />}
                    Remove
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 sticky top-18">

          <div className="rounded-xl border p-5 shadow-sm">
            <h2 className='text-lg font-semibold'>Order Summary</h2>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className='text-sm text-muted-foreground'>
                  Subtotal: {cartData?.numOfCartItems} items
                </span>
                <span className='font-semibold'>
                  {cartData?.data.totalCartPrice} EGP
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className='text-sm text-muted-foreground'>Shipping</span>
                <span className='text-emerald-600 font-medium'>Free</span>
              </div>
            </div>

            <div className='my-4 border-t' />

            <div className="flex items-center justify-between">
              <span className='text-base font-semibold'>Total</span>
              <span className='text-base font-bold'>
                {cartData?.data.totalCartPrice} EGP
              </span>
            </div>

            <CheckOut cartId={cartData?.cartId!} />

            <Link href={'/products'}>
              <Button className='w-full mt-2'>
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3 justify-end my-4">

            <Button
              onClick={clearCart}
              variant={'outline'}
              className='mt-2 text-destructive'>
              {isClearing
                ? <Loader2 className='animate-spin' />
                : <Trash2 />}
              Clear Cart
            </Button>

            <AddAddress />
          </div>
        </div>
      </div>
    </div>
  )
}
