import React from "react";
import { Row, Col } from "react-bootstrap";
import MenuItemCard from "./MenuItemCard";

const MenuGrid = ({ items, images, quantities, onQuantityChange, onAddToCart, onViewMore }) => {
  return (
    <Row className="g-3">
      {items.map((item) => (
        <Col key={item.id} xs={6} sm={6} md={4} lg={3}>
          <MenuItemCard
            item={item}
            image={images[item.id]}
            quantity={quantities[item.id] || 1}
            onQuantityChange={onQuantityChange}
            onAddToCart={onAddToCart}
            onViewMore={onViewMore}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MenuGrid;