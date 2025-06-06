import React from "react";
import MenuItemCard from "./MenuItemCard";

const MenuGrid = ({ items, images, quantities, onQuantityChange, onAddToCart, onViewMore }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id}>
          <MenuItemCard
            item={item}
            image={images[item.id]}
            quantity={quantities[item.id] || 1}
            onQuantityChange={onQuantityChange}
            onAddToCart={onAddToCart}
            onViewMore={onViewMore}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuGrid;