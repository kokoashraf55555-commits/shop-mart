export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface SubCategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Product {
  _id: string
  id: string
  title: string
  slug: string
  description: string
  imageCover: string
  images: string[]
  price: number
  quantity: number
  ratingsAverage: number
  ratingsQuantity: number
  sold: number
  createdAt: string
  updatedAt: string
  __v: number
  brand: Brand
  category: Category
  subcategory: SubCategory[]
}

export interface WishlistResponse {
  status: "success"
  message:string
  count: number
  data: Product[]

}

export interface WishlistItem {
  _id: string
  title: string
  price: number
  imageCover: string
  brand?: { name: string }
  category?: { name: string }
}
