"use client"
import { getCartAction } from "@/app/Actions/cart";
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";


  
export const cartContext = createContext<{
   cartData: CartResponse | null
  setCartData: (value: CartResponse | null) => void
  cartOwner: string | null
  setCartOwner: (value: string | null) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  getCart: () => void
}>({
  cartData: null,
  setCartData: () => {},
  cartOwner: null,
  setCartOwner: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: () => {}
})


export default function CartContextProvider({children}:{children:ReactNode}){
  const [cartData, setCartData] = useState<CartResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cartOwner, setCartOwner] = useState<string | null>(null)

async function getCart(){
  try {
    setIsLoading(true);

    const data: CartResponse = await getCartAction();

    if (data?.data) {
      setCartData(data);
      setCartOwner(data.data.cartOwner ?? null);
    }

    console.log(data);

  } catch (error) {
    console.error("Error fetching cart:", error);
  } finally {
    setIsLoading(false);
  }
}

   
  useEffect(()=>{
    getCart()
  },[])
    return (
    <cartContext.Provider value={{cartData,setCartData,isLoading,setIsLoading,getCart,cartOwner,setCartOwner}}>
      {children}
    </cartContext.Provider>
  )
}