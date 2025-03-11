import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const url_key = searchParams.get("url_key");
  
      if (!url_key) return NextResponse.json({ error: "Missing url_key" }, { status: 400 });
  
      const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query BlogPostByUrlKey($url_key: String) {
        blogPostByUrlKey(url_key: $url_key) {
                author {
            author_id
            author_url
            content
            creation_time
            custom_layout
            custom_layout_update_xml
            custom_theme
            custom_theme_from
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
            role
            short_content
            short_filtered_content
            title
            twitter_page_url
            type
            url
        }
        author_id
        canonical_url
        categories {
            canonical_url
            category_id
            category_level
            category_url
            category_url_path
            content
            content_heading
            custom_layout
            custom_layout_update_xml
            custom_theme
            custom_theme_from
            custom_theme_to
            display_mode
            identifier
            include_in_menu
            is_active
            layout_update_xml
            meta_description
            meta_keywords
            meta_title
            page_layout
            parent_category_id
            path
            position
            posts_count
            posts_sort_by
            relative_url
            title
            type
        }
        category_id
        content_heading
        creation_time
        custom_layout
        custom_layout_update_xml
        custom_theme
        custom_theme_from
        custom_theme_to
        end_time
        featured_list_image
        featured_list_img_alt
        filtered_content
        first_image
        include_in_recent
        is_active
        is_recent_posts_skip
        layout_update_xml
        media_gallery {
            url
        }
        meta_description
        meta_keywords
        meta_title
        og_description
        og_image
        og_title
        og_type
        page_layout
        publish_time
        related_posts {
            ...BlogPostFields
        }
        relatedproduct_id
        relative_url
        search
        secret
        short_content
        short_filtered_content
        tag_id
        tags {
            content
            custom_layout
            custom_layout_update_xml
            custom_theme
            custom_theme_from
            custom_theme_to
            identifier
            is_active
            layout_update_xml
            meta_description
            meta_keywords
            meta_robots
            meta_title
            page_layout
            relative_url
            tag_id
            tag_url
            title
            type
        }
        type
        update_time
        views_count
        ...BlogPostFields
    }
}fragment BlogPostFields on BlogPost {
    featured_image
    featured_img_alt
    identifier
    position
    post_id
    post_url
    title
publish_time
 }`,
          variables: { url_key },
        }),
      });
  
      const data = await response.json();
      console.log("GraphQL Response:", data); // 🔥 Debugging log
  
      if (!data?.data?.blogPostByUrlKey) throw new Error("Invalid response");
  
      return NextResponse.json({
        ...data.data.blogPostByUrlKey,
        featured_image: data.data.blogPostByUrlKey.featured_image || "/default-image.jpg",
      });
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
    }
  }
  