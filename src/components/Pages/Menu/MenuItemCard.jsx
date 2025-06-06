import React from "react";

const MenuItemCard = ({
  item,
  image,
  quantity,
  onQuantityChange,
  onAddToCart,
  onViewMore,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-full transition hover:shadow-lg">
      {image && (
        <img
          src={image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
          ${item.price}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {item.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => onQuantityChange(item.id, e.target.value)}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={() => onAddToCart(item)}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
          >
            Add to cart
          </button>
        </div>

        <button
          onClick={() => onViewMore(item.id)}
          className="mt-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;