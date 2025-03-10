import { fetchDailySales } from "@/lib/fetchDailySales";
import Link from "next/link";

export default async function ProductDetails({ params }: { params: { sku: string } }) {
  const products = await fetchDailySales(); // Fetch all products
  const product = products.find((p) => p.sku === params.sku); // Find the selected product

  if (!product) return <p className="text-center text-xl mt-10">Product not found</p>;

  return (
    <div className="flex justify-center items-center h-full p-6 gap-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 p-6 border rounded-lg shadow-lg bg-white gap-4">
        {/* Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.image.url} 
            alt={product.name} 
            className="w-full max-w-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="line-through text-gray-500 mt-2">Original Price: {product.price_original.toLocaleString()} VND</p>
          <p className="text-red-600 text-2xl font-semibold mt-2">Sale Price: {product.sale_price.toLocaleString()} VND</p>

          {/* Back to Products Button */}
          <Link 
            href="/" 
            className="px-6 py-4 bg-yellow-400 text-white text-center rounded-lg hover:bg-yellow-700 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
