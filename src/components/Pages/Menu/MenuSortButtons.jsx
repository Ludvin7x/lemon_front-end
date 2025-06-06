import { ArrowUp, ArrowDown, FunnelSimple, XCircle } from "phosphor-react";

const MenuSortButtons = ({ sortField, sortDirection, onToggleSort, onResetSort }) => {
  const renderSortLabel = (label, field) => (
    <span className="flex items-center gap-1 select-none">
      {label}
      {sortField === field &&
        (sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
    </span>
  );

  return (
    <div className="text-center mb-4">
      <div className="flex justify-center items-center flex-wrap gap-3">
        {/* Texto + icono */}
        <div className="flex items-center gap-1 mr-2 select-none text-gray-700 font-semibold">
          <FunnelSimple size={20} />
          Sort by:
        </div>

        {/* Botones de ordenar */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md shadow-sm" role="group" aria-label="Sort options">
            <button
              type="button"
              onClick={() => onToggleSort("price")}
              aria-label="Sort by price"
              className={`px-3 py-1 border border-gray-300 rounded-l-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500
                ${sortField === "price" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              {renderSortLabel("Price", "price")}
            </button>
            <button
              type="button"
              onClick={() => onToggleSort("name")}
              aria-label="Sort by name"
              className={`px-3 py-1 border border-gray-300 rounded-r-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500
                ${sortField === "name" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              {renderSortLabel("Name", "name")}
            </button>
          </div>

          {/* Botón Reset */}
          <button
            type="button"
            onClick={onResetSort}
            aria-label="Reset sort"
            title="Reset to default"
            className="inline-flex items-center gap-1 px-3 py-1 border border-red-400 rounded-md text-red-600 text-sm font-semibold hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <XCircle size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSortButtons;