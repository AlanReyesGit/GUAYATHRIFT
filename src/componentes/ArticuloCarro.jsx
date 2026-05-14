import { useState } from "react";
import { useCart } from "../hook/UsarCarro";

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  const [removing, setRemoving] = useState(false);

  function handleRemove() {
    setRemoving(true);

    setTimeout(() => {
      removeFromCart(item.id);
    }, 350);
  }

  return (
    <div className={`cart-item ${removing ? "removing" : ""}`}>
      <img src={item.imagen[0]} alt={item.nombre} />

      <div className="cart-info">
        <h4>{item.nombre}</h4>

        <p>${item.precio}</p>

        <p>Talla: {item.talla}</p>

        <p>Marca: {item.marca}</p>

        <div className="cart-controls">
          <button className="remove" onClick={handleRemove}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
