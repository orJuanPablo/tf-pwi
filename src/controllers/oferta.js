const knex = require("../config/db");
const mailer = require("nodemailer");

const err = {
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
const search = async (req, res) => {
  const id = req.params.id;
  let oferta = {};
  try {
    oferta = await knex
      .from("ofertas")
      .innerJoin("contactos", "ofertas.contacto", "contactos.id_contacto")
      .where({ id_oferta: id });
    res.render("contacto", oferta);
  } catch (error) {
    console.error(error);
    res.render("index", err);
  }
};
const create = async (req, res) => {
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
    try {
      const chk = await knex.select().table("contactos").where("email", email);
      if (chk.length > 0) {
        oferta.contacto = chk[0].id_contacto;
      } else {
        const id_contacto = await knex("contactos").insert(contacto)[0];
        oferta.contacto = id_contacto;
      }

      const ins = await knex("ofertas").insert(oferta);

      if (ins.length > 0) {
        await mail({ email, tel, name, last_name, company_name });
        res.render("index", success);
      }
    } catch (error) {
      console.error(error);
      res.render("index", err);
    }
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
const mail = async (datos) => {
  let { email, tel, name, last_name, company_name } = datos;

  let transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: "juanp.ocampo.22@gmail.com", pass: process.env.MAIL_PASS },
  });

  let info = await transporter.sendMail({
    from: `juanp.ocampo.22@gmail.com `,
    to: `<${email}>`,
    subject: `Respuesta a contacto de ${company_name}`,
    html: `<h1>Muchas gracias por comunicarte conmigo: </h1></br>
     <p>Hola ${last_name}, ${name}.</p>
     <p>Muchas Gracias por comunicarte conmigo y tenerme en cuenta en tu búsqueda,
     intentaré comunicarme contigo lo más pronto posible utilizando la información de contacto que suministraste</p>
     <p>Mail: ${email}</p>
     <p>Teléfono: ${tel}</p>
     <p>Saludos.</p>
     <footer class="container-fluid p-5 bg-primary text-white text-center">
      <p>Proyecto de WEB CV con soporte para contacto y autorespuesta a través de mail</p>
      <p>Desarrollado por Juan Pablo Ocampo Rombolá < orJuanPablo ></p>
     </footer>
      `,
  });
};
