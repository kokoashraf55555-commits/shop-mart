import { BrandI, ProductI } from '@/interfaces';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Heart, HeartIcon, StarIcon } from 'lucide-react';
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function Brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
 const {data:brands}:{data:BrandI[]} =await response.json()
 console.log(brands);

  return <>
  <h1 className=' mx-7 my-7 text-3xl font-bold'>Brands</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 py-2">
  {brands.map((brand)=><div key={brand._id}>
   <Link href={`/brands/${brand._id}`}>
<Card className=''>
  <CardHeader>
    <Image src={brand.image} className='w-full' alt={brand.name} width={200} height={200} />
  
    <CardTitle className='text-center'>{brand.name}</CardTitle>
    
  </CardHeader>
 
 
</Card></Link>
</div>)}
</div>
</>
}
