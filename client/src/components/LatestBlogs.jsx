import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { blogService } from "../api/blogService";

export default function LatestBlogs({ posts, setPosts }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts();
        const latest = [...data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setPosts(latest);
        setLoading(false);
      } catch (error) {
        setError(`Failed to fetch latest posts ${error} `);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setPosts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADLINE */}
        <div className="text-center mb-12">
          <div className="badge mb-4 main-color-bg px-5 py-3 rounded-2xl">
            New
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Latest Blogs</h1>
          <p className="text-gray-600 mx-auto">
            Stay updated with the latest trends, tips, and insights through our
            informative and inspiring blog articles.
          </p>
        </div>

        {/* LATEST BLOGS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              image={post.image}
              title={post.title}
              content={post.content}
              author={post.author}
              category={post.category}
              id={post._id}
              isAuthenticated={isAuthenticated} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
