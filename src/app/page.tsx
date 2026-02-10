"use client"
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import Link from 'next/link';
export default function Home() {
   const Session =  useSession()
   console.log(Session);
  return <>
      <section className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-3xl px-4">

        {/* Greeting */}
        <p className="text-sm text-gray-500 mb-4">
        
        </p>
         {Session.status=="authenticated"&&<span className="text-2xl font-semibold">Hi {Session.data?.user?.name}</span>}
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-black">ShopMart</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
         <Link href="/products"><Button className="bg-black text-white px-10 py-6  hover:bg-gray-800 transition font-bold">Shop Now</Button></Link>
         <Link href="/categories"><Button className="border-2 border-black  text-black px-10 py-6 hover:bg-gray-100 bg-white text transition font-bold">Browse Categories</Button></Link>
        </div>

      </div>
    </section>
  </>
   
  
}
