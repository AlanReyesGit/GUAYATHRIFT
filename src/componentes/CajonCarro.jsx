import { useState } from "react";
import { useCart } from "../hook/UsarCarro";
import CartItem from "./ArticuloCarro";
import CheckoutModal from "./ModalPedido";
import { logEvento } from "../utils/logEvento";

function CartDrawer({ isOpen, closeCart }) {
  const { cart, cartTotal } = useCart();
  const [checkout, setCheckout] = useState(false);
  let uid = localStorage.getItem("uid");
  return (
    <>
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h1>Tu carrito</h1>

          <button className="close-cart" onClick={closeCart}>
            ✕
          </button>
        </div>

        {cart.length === 0 && <p className="empty">Tu carrito está vacío</p>}

        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        <div className="cart-footer">
          <h3>Total: ${cartTotal()}</h3>

          <button className="checkout" 
            disabled={cart.length === 0}
            onClick={() => {
              if (cart.length === 0) return;
              logEvento("abrir_checkout", uid, cart.map((p) => p.nombre).join(", "), "", cartTotal());
              setCheckout(true);
            }
          }>
            Realizar pedido
          </button>
        </div>
      </div>

      {checkout && <CheckoutModal close={() => setCheckout(false)} closeCart={closeCart}/>}
    </>
  );
}

export default CartDrawer;

