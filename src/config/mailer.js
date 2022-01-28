const mailer = require("nodemailer");
const mail = async (datos) => {
  let {
    nombreForm,
    apellidoForm,
    emailForm,
    telForm,
    provForm,
    locForm,
    comForm,
    val,
  } = datos;
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: "juanp.ocampo.22@gmail.com", pass: process.env.MAIL_PASS },
  });
  let info = await transporter.sendMail({
    from: `${nombreForm} `,
    to: `<${emailForm}>`,
    subject: "Contacto MyWeb",
    html: `<h1>contacto es: </h1><br>
      Nombre: ${nombreForm}<br>
      Email: ${emailForm}<br>
      `,
  });
};
module.export = mail;
