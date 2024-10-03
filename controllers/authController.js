const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "claveSecreta";
const JWT_EXPIRES_IN = "30s";

async function login(req, res) {
  const { username, password } = req.body;
  const user = userModel.getUserByUsername(username);
  if (!user)
    return res
      .status(403)
      .json({ code: 403, message: "Usuario no encontrado" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res
      .status(403)
      .json({ code: 403, message: "Contraseña incorrecta" });

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.status(200).json({
    code: 200,
    message: "Inicio de sesión exitoso",
    token,
  });
}

async function createUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ code: 400, message: "Faltan datos" });
  }

  const userExists = userModel.getUserByUsername(username);
  if (userExists) {
    return res.status(409).json({ code: 409, message: "El usuario ya existe" });
  }

  const { apiKey } = userModel.createUser(username, password);
  return res.status(201).json({
    code: 201,
    message: "Usuario creado exitosamente",
    apiKey
  });
}

module.exports = { login, createUser, JWT_SECRET };
