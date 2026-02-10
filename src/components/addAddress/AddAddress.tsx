"use client"
import React, { useRef, useState } from 'react'
import { LocationEditIcon } from 'lucide-react'
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'
import { addAddressAction } from '@/app/Actions/address'


export default function AddAddress() {
  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>(null)
  const detailsRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)

  async function addAddress() {
    setLoading(true)

    const body = {
      name: nameRef.current?.value,
      details: detailsRef.current?.value,
      phone: phoneRef.current?.value,
      city: cityRef.current?.value,
    }

    const data = await addAddressAction(body)

    if (data.status === "success") {
      toast.success("Address Added Successfully")
      router.push("/profile")
    } else {
      toast.error("Failed to add address")
    }

    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer">
          <LocationEditIcon /> Add Address
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input ref={nameRef} placeholder="Home / Work" />
          </div>

          <div>
            <Label>City</Label>
            <Input ref={cityRef} placeholder="Cairo" />
          </div>

          <div>
            <Label>Details</Label>
            <Input ref={detailsRef} placeholder="Street, building..." />
          </div>

          <div>
            <Label>Phone</Label>
            <Input ref={phoneRef} placeholder="010..." />
          </div>

          <Button
            onClick={addAddress}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
