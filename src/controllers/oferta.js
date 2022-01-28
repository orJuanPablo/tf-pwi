const knex = require("../config/db");
const mail = require("../config/mailer");

const list = (req, res) => {
  knex
    .from("ofertas")
    .innerJoin("contactos", "ofertas.contacto", "contactos.id")
    .then((data) => {
      res.render("list", { data });
    });
};
const search = (req, res) => {
  res.send("search");
};
const create = (req, res) => {
  res.send("create");
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
