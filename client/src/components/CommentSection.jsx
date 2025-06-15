import React, { useState, useEffect } from "react";
import { blogService } from "../api/blogService";
import { authService } from "../api/authService";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState("");
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const fetchedComments = await blogService.getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      setError("Failed to load comments");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = await blogService.addComment(postId, newComment);
      setComments([...comments, comment]);
      setNewComment("");
      setError("");
    } catch (error) {
      setError("Failed to add comment");
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;

    try {
      const updatedComment = await blogService.updateComment(
        commentId,
        editContent
      );
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
      setEditingComment(null);
      setEditContent("");
      setError("");
    } catch (error) {
      setError("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await blogService.deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
      setError("");
    } catch (error) {
      setError("Failed to delete comment");
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment._id);
    setEditContent(comment.content);
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold">Comments</h3>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Add Comment Form */}
      {user && (
        <form onSubmit={handleAddComment} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            rows="3"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-main text-white rounded-lg hover:opacity-90"
          >
            Post Comment
          </button>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">
                  {comment.author.firstName} {comment.author.lastName}
                </p>
                {editingComment === comment._id ? (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-main"
                      rows="2"
                    />
                    <div className="space-x-2">
                      <button
                        onClick={() => handleUpdateComment(comment._id)}
                        className="px-3 py-1 bg-main text-white rounded hover:opacity-90"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingComment(null);
                          setEditContent("");
                        }}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-gray-700">{comment.content}</p>
                )}
              </div>
              {user && user._id === comment.author._id && !editingComment && (
                <div className="space-x-2">
                  <button
                    onClick={() => startEditing(comment)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
