import { useCart } from "../hook/UsarCarro";

function FloatingCart({ openCart }) {
  const { cart } = useCart();

  const totalItems = cart.reduce((t, p) => t + p.quantity, 0);

  return (
    <div className="floating-cart" onClick={openCart}>
      🛒
      <span className="cart-count">{totalItems}</span>
    </div>
  );
}

export default FloatingCart;
