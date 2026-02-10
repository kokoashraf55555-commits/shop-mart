"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!email) {
      toast.error("Missing email")
      router.push("/forgot-password")
    }
  }, [email])

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (!email) {
    toast.error("Email is required")
    return
  }

  if (newPassword.length < 6) {
    toast.error("Password must be at least 6 characters")
    return
  }

  setIsLoading(true)

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      body: JSON.stringify({
        email: email,
        newPassword: newPassword
      }),
      headers: { "Content-Type": "application/json" }
    }
  )

  const data = await res.json()

  if (res.ok) {   
    toast.success("Password reset successfully")
    router.push("/login")
  } else {
    toast.error(data.message || "Something went wrong")
  }

  setIsLoading(false)
}

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <Input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />

        <Button className="w-full" type="submit">
          {isLoading && <Loader className="animate-spin mr-2" />}
          Reset Password
        </Button>
      </form>
    </div>
  )
}
