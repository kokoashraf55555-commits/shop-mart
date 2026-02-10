"use client"
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Loader, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'
import { cartContext } from '../context/CartContext'
import AddToWish from '../addToWish/AddToWish'
import { addToCartAction } from '@/app/Actions/cart'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



export default function AddToCard({ productId }: { productId: string }) {
const session = useSession()
const router = useRouter()

  const { getCart } = useContext(cartContext)
  const [isLoading, setIsLoading] = useState(false)

  async function AddProductToCart() {
      if (session.status !== "authenticated") {
    toast.error("Please login first")
    router.push("/login")
    return
  }
    setIsLoading(true)

    const data = await addToCartAction(productId)

    if (data.status === "success") {
      toast.success("Product Added to Cart Successfully")
      await getCart()
    } else {
      toast.error("Failed to add to cart")
    }

    setIsLoading(false)
  }

  return (
    <CardFooter className='gap-2'>
      <Button onClick={AddProductToCart} className='grow cursor-pointer'>
        {isLoading ? <Loader className="animate-spin" /> : <ShoppingCart />} 
        Add to Cart
      </Button>

      <AddToWish productId={productId} />
    </CardFooter>
  )
}
