import React from "react";
import "./Order.css"; // Asegúrate de tener el archivo CSS para el estilo

import plato1 from "../../img/plato1.jpg"
import plato2 from "../../img/plato2.jpg"
import plato3 from "../../img/plato3.jpg"
import plato4 from "../../img/plato4.jpg"
import plato5 from "../../img/plato5.jpg"
import plato6 from "../../img/plato6.jpg"


function Order() {
  const products = [
    {
      id: 1,
      title: "Producto 1",
      description: "Descripción del Producto 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$10",
      image: plato1,
    },
    {
      id: 2,
      title: "Producto 2",
      description: "Descripción del Producto 2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: "$15",
      image: plato2,
    },
    {
      id: 3,
      title: "Producto 3",
      description: "Descripción del Producto 3. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      price: "$20",
      image: plato3,
    },

    {
        id: 4,
        title: "Producto 4",
        description: "Descripción del Producto 3. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        price: "$20",
        image: plato4,
      },

      {
        id: 5,
        title: "Producto 5",
        description: "Descripción del Producto 3. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        price: "$20",
        image: plato5,
      },

      {
        id: 6,
        title: "Producto 6",
        description: "Descripción del Producto 6. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        price: "$20",
        image: plato6,
      },
    // Puedes agregar más productos aquí si es necesario
  ];

  return (
    <div className="order-container">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Order;