import { useCart } from "../contexts/CartContext";
import { toCurrency } from "../utils/currency";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    setQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  if (!cart.length) return <p className="p-4">El carrito está vacío.</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h2 className="mb-4">Tu carrito</h2>

      <Table responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th className="text-center">Cantidad</th>
            <th className="text-end">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={14} />
                </Button>{" "}
                {item.quantity}{" "}
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
              </td>
              <td className="text-end">
                {toCurrency(item.price * item.quantity)}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <strong>Total: {toCurrency(totalPrice)}</strong>
        <div>
          <Button variant="secondary" onClick={clearCart} className="me-2">
            Vaciar carrito
          </Button>
          <Link to="/checkout" className="btn btn-success">
            Proceder al pago
          </Link>
        </div>
      </div>
    </div>
  );
}