const userModel = require("../models/userModel");

function authenticateApiKey(req, res, next) {
  const { apiKey } = req.body;
  if (!apiKey) {
    return res.status(403).json({ code: 403, message: "API Key requerida" });
  }

  const user = userModel.getUserByApiKey(apiKey);
  if (!user) {
    return res.status(403).json({ code: 403, message: "API Key inválida" });
  }

  req.user = user; // Almacena el usuario en la solicitud para usarlo en los controladores
  next();
}

module.exports = authenticateApiKey;
