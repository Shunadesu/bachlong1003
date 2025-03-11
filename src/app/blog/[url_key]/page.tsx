"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "@/constant/BlogPost";
import Link from "next/link";

const BlogPostPage = () => {
  const { url_key } = useParams(); // Get the dynamic URL key
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blogPost?url_key=${url_key}`);
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        setBlog(data);
      } catch (err) {
        setError("Failed to load blog post. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (url_key) fetchBlogPost();
  }, [url_key]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!blog) return <p className="text-center text-gray-600">No blog post found.</p>;

  return (
    <div className="min-h-screen px-6 py-10 flex flex-col items-center">
      {/* Blog Title */}
      <h1 className="text-5xl font-bold gradient-text pb-6">{blog.title}</h1>

      {/* Author Info */}
      <div className="mt-4 text-gray-600 text-lg">
        By:{" "}
        {blog.author?.author_url ? (
          <Link href={blog.author.author_url} className="text-yellow-600 underline">
            {blog.author.name}
          </Link>
        ) : (
          <span>{blog.author?.name || "Unknown Author"}</span>
        )}
      </div>

      {/* Publish Date */}
      <p className="text-gray-500 mt-2">
        Published on: <span className="font-semibold">{new Date(blog.publish_time).toLocaleDateString("vi-VN")}</span>
      </p>

      {/* Blog Content */}
      <div
        className="pt-6 max-w-3xl text-gray-700 leading-7"
        dangerouslySetInnerHTML={{ __html: blog.filtered_content || blog.short_content || "" }}
      />

      {/* Back to Blog List */}
      <Link href="/blog" className="!mt-8 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-700">
        Back to Blogs
      </Link>
    </div>
  );
};

export default BlogPostPage;
