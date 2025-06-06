import { ArrowUp, ArrowDown, FunnelSimple } from "phosphor-react";

const MenuSortButtons = ({ sortField, sortDirection, onToggleSort }) => {
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
        <div className="flex items-center gap-1 mr-2 select-none font-semibold text-gray-700 dark:text-gray-200">
          <FunnelSimple size={20} />
          Sort by:
        </div>

        {/* Botones de ordenar */}
        <div className="inline-flex rounded-md shadow-sm" role="group" aria-label="Sort options">
          <button
            type="button"
            onClick={() => onToggleSort("price")}
            className={`px-3 py-1 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500
              rounded-l-md
              ${
                sortField === "price"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
          >
            {renderSortLabel("Price", "price")}
          </button>
          <button
            type="button"
            onClick={() => onToggleSort("name")}
            className={`px-3 py-1 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500
              rounded-r-md
              ${
                sortField === "name"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
          >
            {renderSortLabel("Name", "name")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSortButtons;
