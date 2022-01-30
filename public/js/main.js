const ROOTURL = "http://localhost:3000/";
const deleteOferta = function deleteOferta(id) {
  fetch(`${ROOTURL}ofertas/delete/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  }).then(() => {
    window.location = `${ROOTURL}ofertas/`;
  });
};
const marcarOferta = function marcarOferta(id) {
  fetch(`${ROOTURL}ofertas/update/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
  }).then(() => {
    window.location = `${ROOTURL}ofertas/`;
  });
};
