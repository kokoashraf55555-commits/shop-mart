import { ProductI } from '@/interfaces';
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
import AddToCard from '@/components/addToCart/AddToCard';
export default async function Products() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
 const {data:products}:{data:ProductI[]} =await response.json()
 console.log(products);
 
  return <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 py-2">
  {products.map((product)=><div key={product.id}>
    <Card className=''>
 <Link href={'/products/' + product.id}>
  <CardHeader>
    <Image src={product.imageCover} className='w-full' alt={product.title} width={200} height={200} />
    <CardDescription>{product.category.name}</CardDescription>
    <CardTitle>{product.title.split(' ',2).join(' ')}</CardTitle>
    <CardDescription>{product.brand.name}</CardDescription>
  </CardHeader>
  <CardContent>
    
   <div className='flex'>
   <MyStarIcon/>
   <MyStarIcon/>
   <MyStarIcon/>
   <MyStarIcon/>
   <MyStarIcon/>

     <p>{products[0]?.ratingsAverage}</p>
   </div>
    <p className='text-xl font-bold'>EGP{products[0]?.price}.00</p>
  </CardContent>

 </Link>
<AddToCard productId={product.id} />

</Card>
</div>)}
</div>
  </>
}
