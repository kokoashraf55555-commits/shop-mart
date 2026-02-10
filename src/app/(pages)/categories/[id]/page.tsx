import AddToCard from "@/components/addToCart/AddToCard"
import { ProductI } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

export default async function CategoryProducts({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params


  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
    { cache: "no-store" }
  )

  const res = await response.json()
  const products: ProductI[] = res.data || []

 
  let categoryName = products[0]?.category?.name

  if (!categoryName) {
    const catRes = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    )
    const catData = await catRes.json()
    categoryName = catData.data?.name || "Unknown Category"
  }

  return (
    <>
      <h1 className="text-4xl font-bold p-6">
        {categoryName}
      </h1>

      <p className="px-6 text-lg text-gray-500">
        Products from this category
      </p>

      {products.length === 0 ? (
        <p className="m-5 text-2xl text-gray-500 text-center min-h-72 flex justify-center items-center">
          No products found for this category
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <div className="border rounded-lg p-3 hover:shadow-md transition">

                <Image
                  src={product.imageCover}
                  width={300}
                  height={300}
                  alt={product.title}
                  className="w-full"
                />

                <h2 className="font-semibold mt-2 truncate">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {product.brand?.name}
                </p>

                <p className="font-bold mt-1">
                  EGP {product.price}
                </p>
              </div>
            </Link>
          ))}

        </div>
      )}
    </>
  )
}

