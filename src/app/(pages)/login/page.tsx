"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import   {email, z} from "zod"
import { Button } from "@/components/ui/button"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import {signIn} from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'
export const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password is too long"),
});
type FormFields=z.infer<typeof formSchema>
export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
   const searchParams = useSearchParams()
   console.log(searchParams.get("error"));
   
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email: "",
      password:""
    }
  })
     async function onSubmit(values : FormFields){
      setIsLoading(true)
  const response = await signIn("credentials",{
    email: values.email,
    password: values.password,
    callbackUrl:"/",
    redirect:true
  })     
console.log(response);
      setIsLoading(false)


    }
  return <>
  <div className="flex flex-col justify-center items-center min-h-[75vh]">
    <h1 className='my-3 text-3xl font-bold'>Welcome Back !</h1>
    
      <Card className='p-5 w-96 max-w-md'>
          <Form {...form}>
            {searchParams.get("error") && <p className="text-red-500 text-center">{searchParams.get("error")}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
<div className="w-full flex justify-end">
  <Link href="/forgot-password" className="text-sm text-blue-700 hover:underline">
    Forgot Password?
  </Link>
</div>
        <Button className='w-full cursor-pointer' type="submit">{isLoading&& <Loader className="animate-spin mr-2"/>}Submit</Button>
      </form>
    </Form>
      </Card>
        <div className="mt-4">You Dont have account? please, <Link className="text-blue-700" href={'/register'}> SignUp</Link></div>

    </div>
  </>
}
