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

knex.schema.hasTable("offers").then(function (exists) {
  if (!exists) {
    return (
      knex.schema.createTable("offers"),
      function (t) {
        t.increments("id").primary();
        t.string("company_name", 100);
        t.integer("type", 11);
        t.string("email", 100);
        t.string("tel_number", 20);
      }
    );
  }
});
knex.schema.hasTable("offers").then(function (exists) {
  if (!exists) {
    return (knex.schema.createTable("offers"),
    function (t) {
      t.increments("id").primary();
      t.integer("contact", 11);
      t.string("description", 250);
    })
      .then(() => console.log("success!! offers table has ben created"))
      .catch((err) => {
        throw new Error(err);
      });
  }
});
knex.schema.hasTable("contacts").then(function (exists) {
  if (!exists) {
    return (knex.schema.createTable("contacts"),
    function (t) {
      t.increments("id").primary();
      t.string("company_name", 100);
      t.string("name", 100);
      t.string("last_name", 100);
      t.string("email", 100);
      t.string("tel", 22);
    })
      .then(() => console.log("success!! contacts table has ben created"))
      .catch((err) => {
        throw new Error(err);
      });
  }
});
