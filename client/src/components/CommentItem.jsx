import React from "react";

export default function CommentItem({ comment, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-800">{comment.user}</p>
          <p className="text-gray-600 mt-1">{comment.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
