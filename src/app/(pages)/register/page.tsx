"use client"
import React, { useState } from 'react'
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
import { Card } from '@/components/ui/card'
import { signIn } from "next-auth/react"
import { Loader } from 'lucide-react'
import Link from 'next/link'

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const formSchema = z.object({
  name: z.string().min(10, "Name is required"),

   email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .refine(
      (val) => val.endsWith("@gmail.com") || val.endsWith("@yahoo.com") || val.endsWith("@outlook.com"),
      "Only Gmail, Yahoo, or Outlook emails are allowed"
    ),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .regex(
      strongPasswordRegex,
      "Password must include uppercase, lowercase, number, and special character"
    ),

  rePassword: z
    .string()
    .min(1, "Confirm password is required"),

  phone: z
    .string()
    .regex(/^01[0-2,5]\d{8}$/, "Please enter a valid Egyptian phone number"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

type FormFields = z.infer<typeof formSchema>

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }
  })

  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    setApiError(null)

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            rePassword: values.rePassword,
            phone: values.phone,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.message || "Signup failed");
        setIsLoading(false);
        return;
      }

    
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/login",
        redirect: true,
      });

    } catch (error) {
      setApiError("Something went wrong. Try again.");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh]">
      <h1 className='my-3 text-3xl font-bold'>Create Account</h1>

      <Card className='p-5 w-96 max-w-md'>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        
            {apiError && (
              <p className="text-red-500 text-center font-semibold">
                {apiError}
              </p>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='w-full' type="submit">
              {isLoading && <Loader className="animate-spin mr-2" />}
              Submit
            </Button>

          </form>
        </Form>
      </Card>

      <div className="mt-4">
        Already have an account?{" "}
        <Link className="text-blue-700" href={'/login'}>
          Login
        </Link>
      </div>
    </div>
  )
}
