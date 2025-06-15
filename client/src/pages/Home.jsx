import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router';
import Header from "../components/Header";
import LatestBlogs from "../components/LatestBlogs";
import FloatingAddButton from "../components/FloatingAddButton";
import PostModal from "../components/PostModal";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isModalOpen = location.pathname === "/new";
  const isAuthenticated = !!localStorage.getItem("token");

  const handlePostCreated = (newPostResponse) => {
    const newPost = newPostResponse.post; 
    setPosts(prev => [newPost, ...prev]);
    navigate("/");
  };
  return (
    <>
      <Header />
      <LatestBlogs posts={posts} setPosts={setPosts} />

      {isAuthenticated && (
        <>
          <FloatingAddButton onClick={() => navigate("/new")} />
          <PostModal
            isOpen={isModalOpen}
            onClose={() => navigate("/")}
            onPostCreated={handlePostCreated}
          />
        </>
      )}
    </>
  );
}
