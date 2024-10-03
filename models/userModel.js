const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

let users = [
  {
    username: "admin",
    password: bcrypt.hashSync("12345", 10), // Contraseña encriptada
    apiKey: bcrypt.hashSync(uuidv4(), 10),  // API Key encriptada
  },
  {
    username: "user",
    password: bcrypt.hashSync("password", 10), // Contraseña encriptada
    apiKey: bcrypt.hashSync(uuidv4(), 10),  // API Key encriptada
  },
];

function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

function createUser(username, password) {
  const apiKey = uuidv4(); // Genera una API Key única
  const newUser = {
    username,
    password: bcrypt.hashSync(password, 10), // Encripta la contraseña
    apiKey: bcrypt.hashSync(apiKey, 10)      // Encripta la API Key
  };
  users.push(newUser);
  return { username: newUser.username, apiKey }; // Devuelve la API Key en texto plano
}

function getUserByApiKey(apiKey) {
  return users.find((user) => bcrypt.compareSync(apiKey, user.apiKey));
}

module.exports = {
  getUserByUsername,
  createUser,
  getUserByApiKey
};
