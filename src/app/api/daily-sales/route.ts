import { NextResponse } from "next/server";

const API_URL = "https://beta-api.bachlongmobile.com/graphql";

interface Product {
  sku: string;
  name: string;
  url_key: string;
  image: { url: string };
  sale_price: number;
  price_original: number;
}

async function fetchPage(page: number, pageSize: number) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query getProductDailySales(
  $filter: DailySaleFilterInput
  $pageSize: Int
  $currentPage: Int
) {
  DailySales(filter: $filter, pageSize: $pageSize, currentPage: $currentPage) {
    items {

      identifier
      items {
        product {
          sku
          name
          url_key
          image {
            url
          }
        }
        sale_price
        price_original
      }
    }
    page_info {
      current_page
      page_size
      total_pages
    }
    total_count
  }
}`, // Keep your GraphQL query
        variables: { filter: { sale_type: { eq: "thuong-hieu" } }, pageSize, currentPage: page },
      }),
    });

    if (!response.ok) throw new Error(`Failed to fetch page ${page}`);

    const json = await response.json();
    return json?.data?.DailySales || { items: [], page_info: { total_pages: 1 } };
  } catch (error) {
    console.error("API error fetching page", page, error);
    return { items: [], page_info: { total_pages: 1 } }; // Prevent infinite loop
  }
}

export async function GET() {
  try {
    let allProducts: Product[] = [];
    const pageSize = 20;
    const firstPage = await fetchPage(1, pageSize);

    const totalPages = firstPage.page_info?.total_pages ?? 1; // ✅ Ensure totalPages is valid
    console.log("Total pages:", totalPages);

    allProducts = firstPage.items.flatMap((item: { items: Product[] }) => item.items);

    const maxPages = 5; // ✅ Prevent excessive requests
    const pagesToFetch = Math.min(totalPages, maxPages);

    for (let page = 2; page <= pagesToFetch; page++) {
      const nextPage = await fetchPage(page, pageSize);
      allProducts.push(...nextPage.items.flatMap((item: { items: Product[] }) => item.items));
    }

    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
