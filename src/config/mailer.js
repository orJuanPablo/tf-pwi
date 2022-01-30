const mailer = require("nodemailer");

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
module.export = mail;
