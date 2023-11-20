const { HttpError } = require("../helpers/helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const sendEmail = require("../helpers/sendEmail");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, BASE_URL } = process.env;
const path = require("path");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  const emailMarkup = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <h1>Email Verification</h1>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <p>Дякуємо, що обрали наш сервіс. Для завершення реєстрації, будь ласка, підтвердіть свою адресу електронної пошти, натискуючи на посилання нижче:</p>
                    <p><a href="${BASE_URL}/users/verify/${verificationToken}">Підтвердити електронну адресу</a></p>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-top: 20px;">
                    <p>Якщо ви не реєструвалися на нашому сайті, проігноруйте цей лист.</p>
                </td>
            </tr>
        </table>
    </body>
  </html>`;

  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: emailMarkup,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  const registerMessageMarcup = `<!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Successful Registration</title>
    </head>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <h1>Успішна реєстрація</h1>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <p>Дякуємо за реєстрацію на нашому сайті. Ваш обліковий запис успішно створено.</p>
                    <p>Тепер ви можете увійти на сайт, використовуючи свою адресу електронної пошти та пароль.</p>
                </td>
            </tr>
        </table>
    </body>
  </html>`;

  res.status(200).send(registerMessageMarcup);
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const emailMarkup = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <h1>Email Verification</h1>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <p>Дякуємо, що обрали наш сервіс. Для завершення реєстрації, будь ласка, підтвердіть свою адресу електронної пошти, натискуючи на посилання нижче:</p>
                    <p><a href="${BASE_URL}/users/verify/${user.verificationToken}">Підтвердити електронну адресу</a></p>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding-top: 20px;">
                    <p>Якщо ви не реєструвалися на нашому сайті, проігноруйте цей лист.</p>
                </td>
            </tr>
        </table>
    </body>
  </html>`;

  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: emailMarkup,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  console.log(passwordCompare);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const { name } = user;

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "14d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({ user: { name, email }, token });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({
    name,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logout sucsess" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
