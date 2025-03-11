import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Get query params
    const page = Number(searchParams.get("page")) || 1; // Default to page 1

    const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query blogPosts($filter: BlogPostsFilterInput, $pageSize: Int, $currentPage: Int, $sortFiled: String, $allPosts: Boolean) {
    blogPosts(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sortFiled: $sortFiled
      allPosts: $allPosts
    ) {
      items {
        author {
          author_id
          author_url
          content
          creation_time
          custom_theme_to
          facebook_page_url
          featured_image
          filtered_content
          identifier
          instagram_page_url
          is_active
          layout_update_xml
          linkedin_page_url
          meta_description
          meta_title
          name
          page_layout
          relative_url
          title
          twitter_page_url
          type
          url
        }
        author_id
        canonical_url
        category_id
        content_heading
        creation_time
        end_time
        featured_image
        featured_img_alt
        featured_list_image
        featured_list_img_alt
        first_image
        identifier
        is_active
        page_layout
        position
        post_id
        post_url
        publish_time
        search
        title
        type
        update_time
        views_count
      }
      total_count
      total_pages
      type
    }
}`,
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
