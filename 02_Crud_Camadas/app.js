// app.js
const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("./user/user.controller.js");
const PerfilController = require("./perfil/perfil.controller.js");

const app = express();
const port = 3000;

app.use(bodyParser.json()); // Para parsing de application/json

const userController = new UserController();
const perfilController = new PerfilController();

// Rotas para o CRUD de Usuário
app.post("/users", (req, res) => userController.createUser(req, res));
app.get("/users", (req, res) => userController.getAllUsers(req, res));
app.get("/users/:id", (req, res) => userController.getUserById(req, res));
app.put("/users/:id", (req, res) => userController.updateUser(req, res));
app.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

// Rotas para o CRUD de Perfil
app.post("/perfil", (req, res) => perfilController.createPerfil(req, res));
app.get("/perfil", (req, res) => perfilController.getAllPerfis(req, res));
app.get("/perfil/:id", (req, res) => perfilController.getPerfilById(req, res));
app.put("/perfil/:id", (req, res) => perfilController.updatePerfil(req, res));
app.delete("/perfil/:id", (req, res) => perfilController.deletePerfil(req, res));
app.patch("/perfil/:id", (req, res) => perfilController.patchPerfil(req, res));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
