import { useState } from "react";
import { useCart } from "../hook/UsarCarro";
import PedidoConfirmado from "./PedidoConfirmado";
import LoadingPedido from "./LoadingPedido";
import { logEvento } from "../utils/LogEvento";

function CheckoutModal({ close, closeCart }) {
  const { cart, cartTotal, clearCart } = useCart();
  let uid = localStorage.getItem("uid");
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    celular: "",
    correo: "",
  });

  const [errores, setErrores] = useState({});

  const formularioCompleto =
    form.nombre.trim() !== "" &&
    form.cedula.length === 10 &&
    form.celular.length >= 10;

  function handleChange(e) {
    let value = e.target.value;

    if (e.target.name === "cedula" || e.target.name === "celular") {
      value = value.replace(/\D/g, "");
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
  }

  function validarCedula(cedula) {
    if (!/^[0-9]{10}$/.test(cedula)) return false;

    const digitos = cedula.split("").map(Number);
    const provincia = parseInt(cedula.substring(0, 2));

    if (provincia < 1 || provincia > 24) return false;

    let suma = 0;

    for (let i = 0; i < 9; i++) {
      let num = digitos[i];

      if (i % 2 === 0) {
        num *= 2;
        if (num > 9) num -= 9;
      }

      suma += num;
    }

    const verificador = (10 - (suma % 10)) % 10;

    return verificador === digitos[9];
  }

  function validar() {
    let e = {};

    if (!form.nombre.trim()) {
      e.nombre = "Ingresa tu nombre";
    }

    if (!validarCedula(form.cedula)) {
      e.cedula = "Cédula ecuatoriana inválida";
    }

    if (!/^[0-9]{9,15}$/.test(form.celular)) {
      e.celular = "Celular inválido";
    }

    if (form.correo && !/^\S+@\S+\.\S+$/.test(form.correo)) {
      e.correo = "Correo inválido";
    }

    setErrores(e);

    return Object.keys(e).length === 0;
  }

  const enviarCompra = async (e) => {
    e.preventDefault();

    if (enviando) return;

    if (!validar()) return;

    setEnviando(true);

    const id = "GT-" + Date.now();

    const pedido = {
      id: id,
      nombre: form.nombre,
      cedula: form.cedula,
      celular: form.celular,
      correo: form.correo,
      productos: cart
        .map((p) => `${p.nombre} ${p.talla} x${p.quantity}`)
        .join(", "),
      total: cartTotal(),
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyLdDsjqFTncnKeKTV1gaZ_Yf7F9Ssr1yamAjnG6ZEmBja6r_rwKN0V8XWoVjaEGno6/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedido),
        },
      );
      logEvento("compra_realizada", pedido.nombre + "-" + uid, pedido.productos, id, cartTotal());
      clearCart();
      setPedidoConfirmado(id);

    } catch (error) {

      console.error("Error enviando pedido", error);
      alert("Error enviando pedido");

    } finally {

      setEnviando(false);

    }
  };

  return (
    <>
      {enviando && <LoadingPedido />}

      <div className="checkout-overlay">
        <div className="checkout-modal">

          <div className="checkout-header">
            <h2>INGRESE SUS DATOS</h2>
          </div>

          <form onSubmit={enviarCompra} className="checkout-form">

            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={
                errores.nombre ? "input-error" : form.nombre ? "input-ok" : ""
              }
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}

            <label>Cédula</label>
            <input
              type="text"
              name="cedula"
              value={form.cedula}
              onChange={handleChange}
              maxLength={10}
              className={
                errores.cedula
                  ? "input-error"
                  : form.cedula.length === 10 && validarCedula(form.cedula)
                  ? "input-ok"
                  : ""
              }
            />
            {errores.cedula && <span className="error">{errores.cedula}</span>}

            <label>Celular</label>
            <input
              type="text"
              name="celular"
              value={form.celular}
              onChange={handleChange}
              maxLength={13}
              className={
                errores.celular ? "input-error" : form.celular ? "input-ok" : ""
              }
            />
            {errores.celular && (
              <span className="error">{errores.celular}</span>
            )}

            <label>Correo (opcional)</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className={
                errores.correo
                  ? "input-error"
                  : form.correo && /^\S+@\S+\.\S+$/.test(form.correo)
                  ? "input-ok"
                  : ""
              }
            />
            {errores.correo && <span className="error">{errores.correo}</span>}

            <div className="checkout-actions">

              <button type="button" className="checkout-cancel" onClick={close}>
                Cancelar
              </button>

              <button
                type="submit"
                className="checkout-confirm"
                disabled={!formularioCompleto || enviando}
              >
                {enviando ? "Enviando..." : "Confirmar pedido"}
              </button>

            </div>
          </form>

        </div>
      </div>

      {pedidoConfirmado && (
        <PedidoConfirmado
          pedidoId={pedidoConfirmado}
          cerrar={() => {
            setPedidoConfirmado(null);
            close();
            closeCart();
          }}
        />
      )}
    </>
  );
}

export default CheckoutModal;