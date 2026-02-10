import { ProductI } from "./product"

export interface OrderI {
  _id: string
  totalOrderPrice: number
  createdAt: string
  cartItems: {
    product: ProductI
    count: number
    price: number
  }[]
}