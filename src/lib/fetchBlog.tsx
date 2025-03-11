import { BlogPost } from "@/constant/BlogPost";

export async function fetchBlog(page: number = 1): Promise<{ items: BlogPost[], total_pages: number }> {
    try {
      const res = await fetch(`http://localhost:3000/api/blog?page=${page}`, { cache: "no-store" });
  
      if (!res.ok) throw new Error("Failed to fetch Blog");
  
      const data = await res.json();
      if (!data?.items) {
        console.error("Invalid response format:", data);
        return { items: [], total_pages: 0 };
      }
  
      return data.items.map((post: BlogPost) => ({
        ...post,
        author_name: post.author?.name || "Unknown",
        author_url: post.author?.author_url || "",
      }));
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return { items: [], total_pages: 0 };
    }
  }
