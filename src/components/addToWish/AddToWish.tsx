"use client"
import { HeartIcon, Loader } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { WishContext } from '../context/WishContext'
import { addToWishAction } from '@/app/Actions/wishlist'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AddToWish({ productId }: { productId: string }) {
  const { getWish } = useContext(WishContext)
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  async function addProductToWish() {
    if (session.status !== "authenticated") {
      toast.error("Please login first")
      router.push("/login")
      return
    }
    setIsLoading(true)

    const data = await addToWishAction(productId)

    if (data.status === "success") {
      toast.success("Product Added to Wishlist Successfully")
      await getWish()
    } else {
      toast.error("Failed to add to wishlist")
    }

    console.log(data)
    setIsLoading(false)
  }

  return (
    <Button
      onClick={addProductToWish}
      className="bg-white hover:bg-white transition-colors duration-300"
    >
      {isLoading ? (
        <Loader className="animate-spin text-black" />
      ) : (
        <HeartIcon className="text-gray-500 hover:text-red-500 transition-colors duration-300" />
      )}
    </Button>
  )
}
