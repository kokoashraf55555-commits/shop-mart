import { ProductI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel" 
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
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { HeartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';
import ProductSlider from '@/components/productSlider/ProductSlider';
import AddToCard from '@/components/addToCart/AddToCard';
export default async function ProductDetails({params}:{params:Params}) {
 let {productid}=await params
  console.log( productid);
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productid)
  const {data:product}:{data:ProductI} = await response.json()
  console.log(product);

  return <>
  <Card className='grid md:grid-cols-2 items-center w-2/4 mx-auto my-20 '>
 <div className='p-3'>
 <ProductSlider images={product.images} altContent={product.title} />
 </div>
 <div>
   <CardHeader>
    <CardDescription>{product.brand.name}</CardDescription>
    <CardTitle className='font-extrabold'>{product.title}</CardTitle>
    <CardDescription className='text-bold my-6 text-lg'>{product.description}</CardDescription>
    
  </CardHeader>
  <CardContent>
  <CardDescription>{product.category.name}</CardDescription>
  <div className="flex gap-1">
    <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <MyStarIcon/>
    <p>({product.ratingsQuantity})</p>
  </div>
  <div className='md-3 flex justify-between'>
    <p className='text-xl font-bold'>EGP{product.price}.00</p>
    <p className='text-xl font-bold'> Quantity: {product.quantity}</p>
  </div>
  </CardContent>
  <AddToCard productId={product.id} />
 </div>
</Card>
  </>
}
 