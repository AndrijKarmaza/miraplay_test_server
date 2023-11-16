const nodemailer = require("nodemailer");
const { META_PASSWORD, SENDER_MAIL, RECIPIENT_MAIL } = process.env;
const nomailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_MAIL,
    pass: META_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nomailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: SENDER_MAIL };
  await transport
    .sendMail(email)
    .then(() => console.log("Email send sucsess"))
    .catch((err) => console.log(err.message));
  return true;
};

module.exports = sendEmail;
