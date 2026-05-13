import { useState } from "react";

function Galeria({ imagen, close }) {
  const [scale, setScale] = useState(1);

  function zoomIn() {
    setScale((prev) => Math.min(prev + 0.2, 4));
  }

  function zoomOut() {
    setScale((prev) => Math.max(prev - 0.2, 1));
  }

  function handleWheel(e) {
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  }

  return (
    <div className="modal" onClick={close}>
      <img
        src={imagen}
        className="imagen-full"
        style={{ transform: `scale(${scale})` }}
        onWheel={handleWheel}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default Galeria;
