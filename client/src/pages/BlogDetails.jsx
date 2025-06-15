import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import CommentList from "../components/CommentList";
import { blogService } from "../api/blogService";
import EditPostModal from "../components/EditPostModal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const isOwner = blog?.author?._id === userId;

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const post = await blogService.getPostById(id);
        setBlog(post);
        setComments(post.comments || []);
        setLoading(false);
      } catch (error) {
        setError(`Failed to fetch blog post: ${error.message || error}`);
        setLoading(false);
      }
    };

    fetchBlogAndComments();
  }, [id]);

  const handleAddComment = async (commentData) => {
    try {
      const newComment = await blogService.addComment(id, commentData);
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentError(null);
      toast.success("Comment added successfully!");
    } catch (error) {
      setCommentError(`Failed to add comment: ${error.message || error}`);
      toast.error(`Failed to add comment.`);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await blogService.deleteComment(id, commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      setCommentError(null);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      setCommentError(`Failed to delete comment: ${error.message || error}`);
      toast.error(`Failed to delete comment.`);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await blogService.deletePost(id);
      toast.success("Post has been deleted!");
      navigate("/feed");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post.");
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handlePostUpdated = (updatedPost) => {
    setBlog(updatedPost);
    setIsEditModalOpen(false);
    toast.success("Post updated successfully!");
    fetchBlogAndComments();

  };

  const fetchBlogAndComments = async () => {
    try {
      const post = await blogService.getPostById(id);
      setBlog(post);
      setComments(post.comments || []);
    } catch (error) {
      console.error("Error refetching post:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center mt-32 font-semibold text-2xl text-red-600 min-h-screen">
        Blog not found.
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 mt-20">
        <div className="aspect-video w-full mb-6">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="mb-2 text-sm px-4 py-2 main-color-bg inline-block rounded-full text-gray-700">
          {blog?.category}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{blog?.title}</h1>
        <p className="italic text-gray-500 mb-4">
          Written by: {blog?.author?.firstName} {blog?.author?.lastName}
        </p>
        <p className="text-gray-700 text-base">{blog?.content}</p>

        {isAuthenticated && isOwner && (
          <div className="flex gap-2 items-end justify-end">
            <button onClick={handleEdit} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button onClick={handleDelete} className="cursor-pointer px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Comments section: TO DO LATER*/}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {commentError && <div className="text-red-500 mb-4">{commentError}</div>}
          <CommentList
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
      </div>

      {isEditModalOpen && (
        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={blog}
          onPostUpdated={handlePostUpdated}
        />
      )}
    </>
  );
}