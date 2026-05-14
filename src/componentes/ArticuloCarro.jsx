import { useState } from "react";
import { useCart } from "../hook/UsarCarro";
import { logEvento } from "../utils/LogEvento";

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  const [removing, setRemoving] = useState(false);

  function handleRemove() {
    setRemoving(true);

    setTimeout(() => {
      removeFromCart(item.id);
    }, 350);
  }
  let uid = localStorage.getItem("uid");
  return (
    <div className={`cart-item ${removing ? "removing" : ""}`}>
      <img src={item.imagen[0]} alt={item.nombre} />

      <div className="cart-info">
        <h4>{item.nombre}</h4>

        <p>${item.precio}</p>

        <p>Talla: {item.talla}</p>

        <p>Marca: {item.marca}</p>

        <div className="cart-controls">
          <button className="remove" onClick={() => { logEvento("eliminar_producto", uid, item.nombre, "-", item.precio); handleRemove(); }}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

