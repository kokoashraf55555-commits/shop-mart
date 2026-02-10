import { ProductI } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

export default async function BrandProducts({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params


  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
    { cache: "no-store" }
  )

  const res = await response.json()
  const products: ProductI[] = res.data || []


  let brandName = products[0]?.brand?.name


  if (!brandName) {
    const brandRes = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    )
    const brandData = await brandRes.json()
    brandName = brandData.data?.name || "Unknown Brand"
  }

  return (
    <>
      <h1 className="text-4xl font-bold p-6  ">
        {brandName}
      </h1>
 <p className=" py- text-lg text-gray-500">
          Products from this brand
        </p>

      {products.length === 0 ? (
        <p className="m-5 text-2xl text-gray-500 text-center min-h-72 flex justify-center items-center">
          No products found for this brand
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
                  {product.category?.name}
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
