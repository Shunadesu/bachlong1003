import { Product } from "../constant/Product";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export async function fetchDailySales(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/api/daily-sales`, { cache: "no-store" }); 

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    if (!data || !Array.isArray(data.products)) {
      console.error("Invalid response format:", data);
      return [];
    }

    return data.products.map((item: { product: Product; sale_price: number; price_original: string }) => ({
      sku: item.product.sku,
      name: item.product.name,
      url_key: item.product.url_key,
      image: item.product.image,
      sale_price: item.sale_price,
      price_original: Number(item.price_original),
    }));
  } catch (error) {
    console.error("Error fetching daily sales:", error);
    return []; // ✅ Return an empty array on error to prevent crash
  }
}
