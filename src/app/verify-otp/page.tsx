"use client"
import { useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"

export default function VerifyCode() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function verifyCode() {
    if (!email) {
      toast.error("Missing email")
      return
    }

    setIsLoading(true)

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        body: JSON.stringify({ resetCode: code }),
        headers: { "Content-Type": "application/json" }
      }
    )

    const data = await res.json()

    if (data.status === "Success") {
      toast.success("Code verified")
      router.push(`/reset-password?email=${email}`)
    } else {
      toast.error(data.message || "Invalid code")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <h1 className="text-2xl font-bold mb-4">Enter Verification Code</h1>

      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button className="mt-6" onClick={verifyCode}>
        {isLoading && <Loader className="animate-spin mr-2" />}
        Verify Code
      </Button>
    </div>
  )
}
