import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Get query params
    const page = Number(searchParams.get("page")) || 1; // Default to page 1

    const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query blogPosts($filter: BlogPostsFilterInput, $pageSize: Int, $currentPage: Int, $sortFiled: String, $allPosts: Boolean) {
            blogPosts(
              filter: $filter
              pageSize: $pageSize
              currentPage: $currentPage
              sortFiled: $sortFiled
              allPosts: $allPosts
            ) {
              items {
                post_id
                title
                post_url
                publish_time
                featured_image
                author {
                  name
                  author_url
                }
              }
              total_count
              total_pages
            }
          }
        `,
        variables: {
          filter: { category_id: { eq: 19 } },
          pageSize: 6,
          currentPage: page, // 🔥 Dynamically set the page
          sortFiled: "publish_time_DESC",
          allPosts: false,
        },
      }),
    });

    const data = await response.json();
    console.log("GraphQL Response:", data); // Debugging log

    if (!data?.data?.blogPosts) throw new Error("Invalid GraphQL response structure");

    return NextResponse.json(data.data.blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
