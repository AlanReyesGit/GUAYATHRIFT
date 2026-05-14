import { useState, useRef } from "react";
import Galeria from "./Galeria";
import { useCart } from "../hook/UsarCarro";
import animarAlCarrito from "../utils/AnimarCarrito";
import { logEvento } from "../utils/logEvento";

function CartaProducto({ product }) {
  const { cart, addToCart } = useCart();
  let uid = localStorage.getItem("uid");

  const [imagenActual, setImagenActual] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [zoom, setZoom] = useState(false);

  const imagenRef = useRef(null);

  const enCarrito = cart.some((p) => p.id === product.id);

  function siguiente() {
    setImagenActual((imagenActual + 1) % product.imagen.length);
  }

  function anterior() {
    setImagenActual(
      (imagenActual - 1 + product.imagen.length) % product.imagen.length,
    );
  }

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchEnd(e) {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distancia = touchStart - touchEnd;

    if (distancia > 50) siguiente();
    if (distancia < -50) anterior();
  }

  function handleAdd() {
    if (enCarrito) return;

    addToCart(product);

    const cartIcon = document.querySelector(".floating-cart");

    animarAlCarrito(imagenRef.current, cartIcon);

    logEvento("agregar_producto", uid, product.nombre, "-" , product.precio);
  }

  return (
    <div className="producto">
      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          ref={imagenRef}
          src={product.imagen[imagenActual]}
          alt={product.nombre}
          onClick={() => setZoom(true)}
        />
      </div>

      <div className="miniaturas">
        {product.imagen.map((img, i) => (
          <img
            key={i}
            src={img}
            className={imagenActual === i ? "activa" : ""}
            onClick={() => setImagenActual(i)}
          />
        ))}
      </div>

      <h3>{product.nombre}</h3>
      <p>${product.precio}</p>
      <p>Talla: {product.talla}</p>
      <p>Marca: {product.marca}</p>

      <button
        className={`boton-carrito ${enCarrito ? "agregado" : ""}`}
        onClick={handleAdd}
        disabled={enCarrito}
      >
        {enCarrito ? "✓ Agregado" : "🛒 Agregar al carrito"}
      </button>

      {zoom && (
        <Galeria
          imagen={product.imagen[imagenActual]}
          close={() => setZoom(false)}
        />
      )}
    </div>
  );
}

export default CartaProducto;

