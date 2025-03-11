"use client";

import React, { useState, useEffect } from "react";
import { fetchBlog } from "@/lib/fetchBlog";
import { BlogPost } from "@/constant/BlogPost";
import Pagination from "@/components/pagnigation/Pagination";
import Link from "next/link";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedBlogs = await fetchBlog(page);
        console.log("API Response:", fetchedBlogs);

        if (Array.isArray(fetchedBlogs)) {
          setBlogs(fetchedBlogs);
        } else {
          console.error("Unexpected API response structure:", fetchedBlogs);
          setBlogs([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs. Please try again later.");
        setBlogs([]);
      }

      setLoading(false);
    };

    loadBlogs();
  }, [page]);

  return (
    <div className="min-h-[80vh] p-6 flex flex-col items-center gap-6">
      <h1 className="text-4xl uppercase gradient-text font-bold text-gray-800 mb-6">Blog Posts</h1>

      {loading ? (
        <div className="text-lg w-full h-full text-gray-600 flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-[1440px] grid grid-cols-1 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link 
              href={`/blog/${blog.identifier}`} // Use identifier as the URL key
              key={blog.post_id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img src={blog.featured_image} alt={blog.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-2xl line-clamp-2 font-semibold text-gray-900">{blog.title}</h2>
                <div className="text-gray-600 text-[14px]">By: {blog.author?.name || "Unknown Author"}</div>
                <p className="text-gray-500 text-[14px]">Published on: <span className="font-bold">{new Date(blog.publish_time).toLocaleDateString("vi-VN")}</span></p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Pagination page={page} setPage={setPage}/>
    </div>
  );
};

export default Blog;
