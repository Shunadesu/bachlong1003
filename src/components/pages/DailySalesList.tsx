"use client";
import { useEffect, useState } from "react";
import { fetchDailySales } from "../../lib/fetchDailySales";
import { Product } from "../../constant/Product";
import Link from "next/link";
import Image from "next/image";

export function DailySalesList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDailySales();
        setProducts(data ?? []); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products available</p>; 

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <Link href={`/product/${product.sku}`} key={product.sku} className="border p-4 rounded-lg shadow-lg w-[350px] h-[350px] flex justify-center items-center gap-2 flex-col">
          <div className="w-[160px] h-[160px]">
            <Image
            width={160}
            height={160} 
              src={product.image.url} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="font-bold text-center pt-4">{product.name}</p>
          <p className="line-through">Price original: {product.price_original.toLocaleString()} VND</p>
          <p className="text-red-600 text-[18px]">Sale Price: {product.sale_price.toLocaleString()} VND</p>
        </Link>
      ))}
    </div>
  );
}
