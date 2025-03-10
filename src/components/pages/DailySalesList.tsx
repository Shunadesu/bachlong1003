"use client";
import { useEffect, useState } from "react";
import { fetchDailySales } from "../../lib/fetchDailySales";
import { Product } from "../../constant/Product";
import Link from "next/link";

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
        <Link href={`/product/${product.sku}`} key={product.sku} className="border border-pink-400 bg-white p-4 rounded-lg shadow-lg md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] xl:w-[330px] xl:h-[330px] flex justify-center items-center gap-2 flex-col transition-all duration-300 hover:shadow-xl">
          <div className="transition-all duration-300 xl:w-[160px] xl:hover:w-[170px] xl:h-[160px] xl:hover:h-[170px] lg:w-[140px] lg:hover:w-[150px] lg:h-[140px] lg:hover:h-[150px] md:w-[120px] md:h-[120px] w-[100px] h-[100px] ">
            <img
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
