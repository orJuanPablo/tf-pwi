const knex = require("../config/db");
const mail = require("../config/mailer");
const error = {
  titulo: "orJuanPablo",
  warning: true,
  alertTitle: "oops ha ocurrido un error inesperado",
  alertText:
    "Estamos teniendo problemas a la hora de responder a su solicitud por favor intente de nuevo más tarde.",
  success: false,
};
const success = {
  titulo: "orJuanPablo",
  warning: false,
  alertTitle: "La solicitud ha sido enviada con éxito",
  alertText: `La solicitud ha sido recibida con éxito revise su casilla de correo para más información.`,
  success: true,
};
const warning = {
  titulo: "orJuanPablo",
  warning: true,
  alertTitle: "oops ha ocurrido un error inesperado",
  alertText:
    "Por favor revise que todos los datos del formulario esten completos.",
  success: false,
};
const list = (req, res) => {
  knex
    .from("ofertas")
    .innerJoin("contactos", "ofertas.contacto", "contactos.id_contacto")
    .then((data) => {
      res.render("list", { data });
    });
};
const search = (req, res) => {
  res.send("search");
};
const create = (req, res) => {
  const { name, last_name, email, tel, tipo, company_name, descripcion } =
    req.body;
  if (
    name == "" ||
    last_name == "" ||
    email == "" ||
    tel == "" ||
    company_name == "" ||
    descripcion == "" ||
    (tipo !== "1" && tipo !== "0")
  ) {
    res.render("index", warning);
  } else {
    const contacto = { name, last_name, email, tel };
    const oferta = { company_name, tipo, descripcion, contacto: "" };
    knex
      .select()
      .table("contactos")
      .where("email", email)
      .then((chk) => {
        if (chk.length > 0) {
          oferta.contacto = chk[0].id;
          knex("ofertas").insert(oferta).then(res.render("index", success));
        } else {
          knex("contactos")
            .insert(contacto)
            .then((data) => {
              oferta.contacto = data[0];
              knex("ofertas").insert(oferta).then(res.render("index", success));
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.render("index", error);
      });
  }
};
const update = (req, res) => {
  res.send("update");
};
const eliminar = (req, res) => {
  res.send("eliminar");
};
module.exports = {
  list,
  search,
  create,
  update,
  eliminar,
};
