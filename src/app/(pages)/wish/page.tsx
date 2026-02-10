"use client"
import Image from "next/image"
import { HeartIcon, Loader2 } from "lucide-react"
import { useContext, useState } from "react"
import { WishContext } from "@/components/context/WishContext"
import Loading from "@/app/loading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

import { WishlistResponse, WishlistItem } from "@/interfaces"
import { cartContext } from "@/components/context/CartContext"
import {
  deleteWishItemAction,
  addToWishAction
} from "@/app/Actions/wishlist"

import { addToCartAction } from "@/app/Actions/cart"

export default function Wish() {
  const { wishData, isLoading, setWishData } = useContext(WishContext)
  const { getCart } = useContext(cartContext)
  const [RemovingId, setRemovingId] = useState<null | string>(null)
const [addingId, setAddingId] = useState<null | string>(null)

  if (isLoading) return <Loading />

  if (wishData && wishData.data.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        <p className="text-xl font-semibold mb-4">
          Your Wishlist Is Empty
        </p>

        <Link href={'/products'}>
          <Button className="rounded-xl px-4 py-5 text-md">
            Add items
          </Button>
        </Link>
      </div>
    )
  }

  


async function deleteWishItem(productId: string) {
  setRemovingId(productId)

  const data = await deleteWishItemAction(productId)

  if (data.status === "success") {
    toast.success("Product Removed from Wishlist Successfully")

    const newWishData = {
      ...wishData!,
      count: wishData!.count - 1,
      data: wishData!.data.filter(
        (item: WishlistItem) => item._id !== productId
      )
    }

    setWishData(newWishData)
  }

  setRemovingId(null)
}




  return (
    <div className="container mx-auto p-10">
     
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <HeartIcon className="text-red-500" size={28} />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>

        <p className="text-muted-foreground mt-2 mx-3">
          {wishData?.count} items in your wishlist
        </p>
      </div>

      {wishData?.data.map((item: WishlistItem) => (
        <div
          key={item._id}
          className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card mb-4"
        >
          <Image
            src={item.imageCover}
            width={100}
            height={100}
            alt={item.title}
            className="w-24 h-24 rounded-lg object-cover"
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

              <div>
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {item.brand?.name} • {item.category?.name}
                </p>

              
              <Button
  className="mt-3 rounded-xl"
  variant="outline"
  onClick={async () => {
    setAddingId(item._id)

    await addToCartAction(item._id)

    toast.success("Added to Cart")

    setAddingId(null)
    await getCart()
  }}
>
  {addingId === item._id && <Loader2 className="animate-spin mr-2" />}
  Add to Cart
</Button>


              </div>

              <div className="text-right">
                <div className="font-semibold">
                  EGP {item.price}
                </div>
                <p className="text-xs text-gray-400">each</p>

                <button
                  onClick={() => deleteWishItem(item._id)}
                  className="text-red-500 text-sm mt-3 cursor-pointer"
                >
                  {RemovingId === item._id && (
                    <Loader2 className="animate-spin inline mr-1" />
                  )}
                  Remove
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
