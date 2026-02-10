"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import toast from "react-hot-toast"
import Link from "next/link"
import { Loader } from "lucide-react"

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
})

type FormFields = z.infer<typeof schema>

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
const router = useRouter()

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  })

  async function onSubmit(values: FormFields) {
  setIsLoading(true)

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      body: JSON.stringify({ email: values.email }),
      headers: { "Content-Type": "application/json" }
    }
  )

  const data = await res.json()

  if (data.message) {
    toast.success("Check your email")

  
    router.push(`/verify-otp?email=${values.email}`)
  } else {
    toast.error("Something went wrong")
  }

  setIsLoading(false)
}

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh]">
      <h1 className='my-3 text-3xl font-bold'>Forgot Password</h1>

      <Card className='p-5 w-96 max-w-md'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              {isLoading && <Loader className="animate-spin mr-2" />}
              Send Reset Link
            </Button>
          </form>
        </Form>
      </Card>

      <div className="mt-4">
        Back to{" "}
        <Link className="text-blue-700" href="/login">
          Login
        </Link>
      </div>
    </div>
  )
}
