import { Product } from "../constant/Product";

export async function fetchDailySales(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3000/api/daily-sales"); 

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
