"use client"
import React, { useEffect, useState } from "react"
import Loading from "@/app/loading"
import { toast } from "react-hot-toast"
import { Address } from "@/interfaces"
import { useRouter } from "next/navigation"
import { getAddressesAction, deleteAddressAction } from "@/app/Actions/profile"

export default function Profile() {

  const router = useRouter()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function getAddresses() {
    try {
      const data = await getAddressesAction()

      if (data.status === "success") {
        setAddresses(data.data)
      }
    } catch (error) {
      toast.error("Failed to load addresses")
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteAddress(id: string) {
    setDeletingId(id)

    try {
      const data = await deleteAddressAction(id)

      if (data.status === "success") {
        toast.success("Address removed successfully")

        setAddresses((prev) =>
          prev.filter((addr) => addr._id !== id)
        )
      } else {
        toast.error("Failed to delete address")
      }
    } catch (error) {
      toast.error("Failed to delete address")
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    getAddresses()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Addresses</h1>

      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses added yet</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="border rounded-xl p-4 shadow-sm flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {address.name}
                </h2>

                <p className="text-sm text-gray-600">
                  {address.city}
                </p>
                <p className="text-sm text-gray-600">
                  {address.details}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {address.phone}
                </p>
              </div>

              <button
                onClick={() => deleteAddress(address._id)}
                disabled={deletingId === address._id}
                className="text-red-500 text-sm hover:underline"
              >
                {deletingId === address._id
                  ? "Removing..."
                  : "Remove"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
