import {  CategoryI  } from '@/interfaces';
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';


  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
 const {data:categories}:{data:CategoryI[]} =await response.json()
 console.log(categories);

export default function Categories() {
  return <>
  <h1 className=' mx-7 my-7 text-3xl font-bold'>Categories</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 py-2">
  {categories.map((category)=><div key={category._id}>
   <Link href={'/categories/' + category._id}> <Card className=''>
  <CardHeader>
    <Image src={category.image} className='w-full' alt={category.name} width={200} height={200} />
  
    <CardTitle className='text-center'>{category.name}</CardTitle>
    
  </CardHeader>
 
 
</Card></Link>
</div>)}
</div>
  </>
}
