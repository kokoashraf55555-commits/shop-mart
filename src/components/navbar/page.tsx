"use client"
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileTextIcon, HeartIcon, ListOrderedIcon, Loader, LogInIcon, LogOutIcon, ShoppingBasketIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { cartContext } from '../context/CartContext'
import AddToWish from '../addToWish/AddToWish'
import { signOut, useSession } from 'next-auth/react'
export default function Navbar() {
 const Session =  useSession()
 console.log(Session);
 
 const {cartData,isLoading} = useContext(cartContext)
 return <>
<nav className=' bg-gray-100 text-2xl font-semibold py-3 sticky top-0'>
  <div className="container mx-auto ">
    <div className="flex items-center justify-between mx-16"> 
    <div className="flex items-center gap-2">
       <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded">
              S
            </div>
            
     <h1 >
          <Link href="/">ShopMart</Link>
        </h1>
    </div>
       
        <NavigationMenu>
  <NavigationMenuList>
  <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

<div className="flex items-center">
{Session.status=="authenticated"&&<span className="text-sm font-semibold">Hi {Session.data?.user?.name}</span>}
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
   <UserIcon/> 
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
  
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      {Session.status=="authenticated"?   <>
      <Link href="/profile"><DropdownMenuItem> <UserIcon/> Profile</DropdownMenuItem></Link>
      <Link href="/allorders"><DropdownMenuItem><ListOrderedIcon/> Your Orders</DropdownMenuItem></Link>
   <DropdownMenuGroup >
      <DropdownMenuSeparator />
      <>
  <DropdownMenuItem  onClick={()=>signOut({
    callbackUrl:"/"
  })}> <LogOutIcon /> Logout</DropdownMenuItem>
      </>
      
    </DropdownMenuGroup>
  </>:  <DropdownMenuGroup >
      <DropdownMenuSeparator />
      <>
           <Link href="/login"><DropdownMenuItem><LogInIcon/> LogIn</DropdownMenuItem></Link>
      <Link href="/register"><DropdownMenuItem><FileTextIcon/> Register</DropdownMenuItem></Link>
      </>
      
    </DropdownMenuGroup>}
   
    </DropdownMenuGroup>
  
  </DropdownMenuContent>
</DropdownMenu>

{
  Session.status=="authenticated"&&
  <><Link href="/wish">
  <HeartIcon className='text-gray-500 hover:text-red-500 transition-colors duration-300 cursor-pointer' />
  </Link>

<div className='relative '>

  <Link href="/cart"><ShoppingCartIcon />
  <Badge className='h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono  '>
    { isLoading?<Loader className='animate-spin'/>:cartData?.numOfCartItems}</Badge></Link>



</div>
</>
}
</div>
    </div>
  </div> 
</nav>
  </>
}
