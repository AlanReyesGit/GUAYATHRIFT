export function logEvento(evento, usuario = "", producto = "", codigo_compra = "", total = "") {

  const uid = usuario || localStorage.getItem("uid");

  fetch("https://script.google.com/macros/s/AKfycbwPlvyG1-NJ518y3xUdmXvsTplJDSwyoUd0YW7I16oPq6l_e7PpU0-6htowKhoU9Gi5/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      evento,
      usuario: uid,
      producto,
      codigo_compra,
      total
    })
  });

}