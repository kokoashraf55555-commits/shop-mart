"use client"

import { WishlistResponse } from "@/interfaces/wish"
import { createContext, useEffect, useState } from "react"
import { getWishAction } from "@/app/Actions/wish"

export const WishContext = createContext<{
    wishData: WishlistResponse | null
    setWishData: (value: WishlistResponse | null) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    getWish: () => void
}>({
  wishData: null,
  setWishData:()=>{},
  isLoading: false,
  setIsLoading:()=>{},
  getWish:()=>{}
})

export default function WishContextProvider({children}:{children:React.ReactNode}){

   const [wishData, setWishData] = useState<WishlistResponse | null>(null)
   const [isLoading, setIsLoading] = useState(false)

   async function getWish(){
     try {
       setIsLoading(true)

       const data: WishlistResponse = await getWishAction()
       setWishData(data)

       console.log("WISHLIST DATA:", data); 

     } catch (error) {
       console.error("Error fetching wishlist:", error)
     } finally {
       setIsLoading(false)
     }
   }

   useEffect(()=>{
     getWish()
   },[])

   return (
     <WishContext.Provider value={{
        wishData,
        setWishData,
        isLoading,
        setIsLoading,
        getWish
     }}>
       {children}
     </WishContext.Provider>
   )
}
