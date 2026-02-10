
 "use client"

import Loading from '@/app/loading'
import { cartContext } from '@/components/context/CartContext'
import { OrderI } from '@/interfaces/order'
import React, { useContext, useEffect, useState } from 'react'

export default function AllOrders() {
  const { cartOwner } = useContext(cartContext)
  const [orders, setOrders] = useState<OrderI[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!cartOwner) return

    async function getOrders() {
      setIsLoading(true)
    
        const response = await fetch(
          'https://ecommerce.routemisr.com/api/v1/orders/user/'+ cartOwner
        )
        const { data } = await response.json()
       setOrders(data ?? [])
        setIsLoading(false)
      
    }

    getOrders()
  }, [cartOwner])

  if (isLoading) return <Loading />

  return <>
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
{orders.length === 0 ?<p className="text-2xl font-bold mb-6 text-center">No orders yet</p>
      :orders.map((order)=>
   <div className="border rounded-xl p-5 flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Order :{order._id}</h2>

          <p className="text-sm text-gray-600">
            Order Date:{order.createdAt}
          </p>

         
          

          <p className="text-sm font-medium">
            Total: {order.totalOrderPrice}
          </p>

       

          
        </div>

        <p className="text-xs text-gray-400">
          Last updated: {order.createdAt}
        </p>
      </div>
)} 
  
</div>
 
   
    
  </>
}

      