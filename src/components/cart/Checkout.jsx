import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { cartItems } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.title} x {item.quantity} — ${item.price * item.quantity}
        </div>
      ))}
      <p className="mt-4 font-semibold">
        Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
      </p>
    </div>
  );
}