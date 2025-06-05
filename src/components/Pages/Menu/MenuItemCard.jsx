import React from "react";
import { Card, Button, Form } from "react-bootstrap";

const MenuItemCard = ({
  item,
  image,
  quantity,
  onQuantityChange,
  onAddToCart,
  onViewMore,
}) => {
  return (
    <Card className="h-100 shadow-sm d-flex flex-column">
      {image && (
        <Card.Img
          variant="top"
          src={image}
          alt={item.title}
          style={{ objectFit: "cover", height: "200px" }}
        />
      )}
      <Card.Body className="d-flex flex-column flex-grow-1">
        <Card.Title>{item.title}</Card.Title>
        <Card.Text className="text-muted mb-2">${item.price}</Card.Text>
        <Card.Text className="text-muted mb-3">{item.description}</Card.Text>

        <div className="d-flex align-items-center mb-3 gap-2" style={{ flexWrap: "wrap" }}>
          <Form.Control
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => onQuantityChange(item.id, e.target.value)}
            style={{ width: "80px" }}
          />
          <Button
            variant="success"
            onClick={() => onAddToCart(item)}
            className="flex-shrink-0"
            style={{ whiteSpace: "nowrap" }}
          >
            Add to cart
          </Button>
        </div>

        <Button
          variant="outline-primary"
          onClick={() => onViewMore(item.id)}
          className="mt-auto"
        >
          View more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MenuItemCard;