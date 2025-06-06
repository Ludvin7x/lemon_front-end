import React from "react";
import { XCircle } from "phosphor-react";

const MenuSearch = ({ value, onChange, onClear }) => (
  <div className="flex items-center mb-4 max-w-md mx-auto border border-gray-300 rounded-md overflow-hidden shadow-sm">
    <input
      type="text"
      className="flex-grow px-4 py-2 outline-none text-sm"
      placeholder="Search menu items"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <button
      onClick={onClear}
      title="Clear search"
      className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-150"
    >
      <XCircle size={20} />
    </button>
  </div>
);

export default MenuSearch;