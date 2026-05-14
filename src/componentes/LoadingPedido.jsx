function LoadingPedido() {
  return (
    <div className="loading-overlay">
      <div className="loading-box">

        <div className="spinner"></div>

        <p>Enviando pedido...</p>

      </div>
    </div>
  );
}

export default LoadingPedido;