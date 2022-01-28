const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_CONNECTION_HOST,
    port: process.env.DB_CONNECTION_PORT,
    user: process.env.DB_CONNECTION_USER,
    password: process.env.DB_CONNECTION_PASS,
    database: process.env.DB_CONNECTION_DB,
  },
  pool: { min: 0, max: 7 },
});

knex.schema.hasTable("ofertas").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("ofertas", function (t) {
        t.increments("id").primary();
        t.integer("contacto", 11);
        t.string("descripcion", 250);
      })
      .then(() => console.log("success!! table: ofertas has ben created"))
      .catch((err) => {
        throw new Error(err);
      });
  }
});
knex.schema.hasTable("contactos").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("contactos", function (t) {
        t.increments("id").primary();
        t.string("company_name", 100);
        t.string("name", 100);
        t.string("last_name", 100);
        t.string("email", 100);
        t.string("tel", 22);
      })
      .then(() => console.log("success!! table: contactos has ben created"))
      .catch((err) => {
        throw new Error(err);
      });
  }
});
module.exports = knex;
