import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return <>
     <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">

   
      <h1 className="text-3xl font-bold tracking-wide">
        ShopMart
      </h1>

    
      <div className="relative h-16 w-16">
   
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

    
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-gray-300 border-b-black" />
      </div>

    </div>
  </>
}

