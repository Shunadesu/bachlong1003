export interface Product {
    sku: string;
    name: string;
    url_key: string;
    image: { url: string }; // Ensure this is always defined
    sale_price: number;
    price_original: number;
  }
  