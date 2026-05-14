import { useState } from "react";

function PedidoConfirmado({ pedidoId, cerrar }) {
  const [copiado, setCopiado] = useState(false);

  function copiarID() {
    navigator.clipboard.writeText(pedidoId);

    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  }

  return (
    <div className="success-overlay">
      <div className="success-modal">
        <h2 style={{ marginBottom: "40px" }}>✅ Pedido confirmado</h2>

        <p>Tu número de pedido es:</p>

        <div className="pedido-id-box">
          <span className="pedido-id">{pedidoId}</span>

          <button className="copiar-btn" onClick={copiarID}>
            {copiado ? "✓ Copiado" : "Copiar"}
          </button>
        </div>

        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default PedidoConfirmado;