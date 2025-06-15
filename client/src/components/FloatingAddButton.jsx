import React from "react";

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 btn-main btn rounded-full w-14 h-14 text-3xl shadow-lg z-40"
    >
      +
    </button>
  );
}
