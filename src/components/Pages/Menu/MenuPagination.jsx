import React from "react";

const MenuPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 text-sm rounded-md border ${
          page === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-blue-600 border-blue-300 hover:bg-blue-100"
        }`}
      >
        Prev
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 text-sm rounded-md border ${
            page === num
              ? "bg-blue-600 text-white border-blue-600"
              : "text-blue-600 border-blue-300 hover:bg-blue-100"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 text-sm rounded-md border ${
          page === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-blue-600 border-blue-300 hover:bg-blue-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default MenuPagination;