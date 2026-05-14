import { useState, useEffect } from "react";
import FloatingCart from "../componentes/CarroFlotante";
import CartDrawer from "../componentes/CajonCarro";
import NavBar from "../componentes/BarraNavegacion";
import Pie from "../componentes/Pie";
import Productos from "../datos/Productos";
import ProductCard from "../componentes/CartaProducto";
import { logEvento } from "../utils/logEvento";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  
  useEffect(() => { 
    let uid = localStorage.getItem("uid");

    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("uid", uid);
    }

    logEvento("ingreso_web", uid); 
  }, []);

  function addToCart(product) {
    setCart((prev) => [...prev, product]);
  }
  
  return (
    <>
    
      <NavBar />

      <section className="productos">
        <h2>PRENDAS</h2>

        <div className="grid-productos">
          {Productos.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <Pie />

      <FloatingCart openCart={() => setOpen(true)} cartCount={cart.length} />

      <CartDrawer isOpen={open} closeCart={() => setOpen(false)} cart={cart} />
    </>
  );
}

export default Home;
