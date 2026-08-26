import { useState, useEffect, useMemo } from "react";
import FloatingCart from "../componentes/CarroFlotante";
import CartDrawer from "../componentes/CajonCarro";
import NavBar from "../componentes/BarraNavegacion";
import Pie from "../componentes/Pie";
import Productos from "../datos/Productos";
import ProductCard from "../componentes/CartaProducto";
import { logEvento } from "../utils/LogEvento";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // PANEL DE FILTROS (oculto/visible)
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  // Precio mínimo y máximo reales, calculados desde los productos
  const { precioMin, precioMax } = useMemo(() => {
    const precios = Productos.map((p) => p.precio);
    return {
      precioMin: Math.min(...precios),
      precioMax: Math.max(...precios),
    };
  }, []);

  // FILTROS
  const [filtroGenero, setFiltroGenero] = useState("todo");
  const [filtroPrecio, setFiltroPrecio] = useState(precioMax);
  const [filtroTalla, setFiltroTalla] = useState("todas");

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

  function limpiarFiltros() {
    setFiltroGenero("todo");
    setFiltroPrecio(precioMax);
    setFiltroTalla("todas");
  }

  // FILTRADO DE PRODUCTOS
  const productosFiltrados = Productos.filter((producto) => {

    // FILTRO DE GÉNERO
    const cumpleGenero =
      filtroGenero === "todo" ||
      producto.sexo === filtroGenero;

    // FILTRO DE PRECIO (slider: muestra productos hasta el valor elegido)
    const cumplePrecio = producto.precio <= filtroPrecio;

    // FILTRO DE TALLA
    const cumpleTalla =
      filtroTalla === "todas" ||
      producto.talla === filtroTalla;

    return cumpleGenero && cumplePrecio && cumpleTalla;
  });

  return (
    <>
      <NavBar />

      <section className="productos">

        <h2>PRENDAS</h2>

        <div className="catalogo">

          {/* =========================
              BOTÓN PARA MOSTRAR/OCULTAR FILTROS
          ========================== */}
          <button
            type="button"
            className="toggle-filtros"
            aria-expanded={filtrosAbiertos}
            onClick={() => setFiltrosAbiertos((prev) => !prev)}
          >
            {filtrosAbiertos ? "✕ Cerrar filtros" : "☰ Filtros"}
          </button>

          {/* Fondo oscuro clickeable para cerrar (útil en mobile) */}
          {filtrosAbiertos && (
            <div
              className="filtros-overlay"
              onClick={() => setFiltrosAbiertos(false)}
            />
          )}

          {/* =========================
              FILTROS
          ========================== */}
          <aside
            className={`filtros ${filtrosAbiertos ? "filtros-abierto" : "filtros-cerrado"}`}
          >

            <div className="filtro-grupo">

              <h3>GÉNERO</h3>

              <button
                className={filtroGenero === "todo" ? "filtro-activo" : ""}
                onClick={() => setFiltroGenero("todo")}
              >
                Todo
              </button>

              <button
                className={filtroGenero === "hombre" ? "filtro-activo" : ""}
                onClick={() => setFiltroGenero("hombre")}
              >
                Hombre
              </button>

              <button
                className={filtroGenero === "mujer" ? "filtro-activo" : ""}
                onClick={() => setFiltroGenero("mujer")}
              >
                Mujer
              </button>

            </div>


            <div className="filtro-grupo">

              <h3>PRECIO</h3>

              <div className="filtro-precio-slider">
                <input
                  type="range"
                  min={precioMin}
                  max={precioMax}
                  step="1"
                  value={filtroPrecio}
                  onChange={(e) => setFiltroPrecio(Number(e.target.value))}
                />
                <p className="filtro-precio-valor">
                  Hasta ${filtroPrecio}
                </p>
              </div>

            </div>


            <div className="filtro-grupo">

              <h3>TALLA</h3>

              <button
                className={filtroTalla === "todas" ? "filtro-activo" : ""}
                onClick={() => setFiltroTalla("todas")}
              >
                Todas
              </button>

              <button
                className={filtroTalla === "S" ? "filtro-activo" : ""}
                onClick={() => setFiltroTalla("S")}
              >
                S
              </button>

              <button
                className={filtroTalla === "M" ? "filtro-activo" : ""}
                onClick={() => setFiltroTalla("M")}
              >
                M
              </button>

              <button
                className={filtroTalla === "L" ? "filtro-activo" : ""}
                onClick={() => setFiltroTalla("L")}
              >
                L
              </button>

            </div>


            {/* LIMPIAR FILTROS */}

            <button
              className="limpiar-filtros"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>

          </aside>


          {/* =========================
              PRODUCTOS
          ========================== */}

          <div className="grid-productos">

            {productosFiltrados.length > 0 ? (

              productosFiltrados.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  addToCart={addToCart}
                />
              ))

            ) : (

              <p className="sin-productos">
                No hay prendas que coincidan con los filtros.
              </p>

            )}

          </div>

        </div>

      </section>

      <Pie />

      <FloatingCart
        openCart={() => setOpen(true)}
        cartCount={cart.length}
      />

      <CartDrawer
        isOpen={open}
        closeCart={() => setOpen(false)}
        cart={cart}
      />

    </>
  );
}

export default Home;
