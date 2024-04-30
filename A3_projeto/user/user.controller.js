const UserService = require("./user.service");
const userService = new UserService();
const UserDTO = require("./user.dto.js");
const jwt = require('jsonwebtoken'); 

class UserController {
  createUser(req, res) {
    try {
      res.json(userService.createUser(new UserDTO(req.body, true)));
    } catch(error) {
      res.status(400).json({ msg: error.message });
    }
  }

  getAllUsers(req, res) {
    const users = userService.findAll();
    res.json(users);
  }

  getUserById(req, res) {
    const user = userService.findOne(req.params.id);
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }
    res.json(user);
  }

  updateUser(req, res) {
    req.body.id = req.params.id;
    const updatedUser = userService.update(new UserDTO(req.body));
    if (!updatedUser) return res.status(404).send("Usuário não encontrado");
    res.status(200).json(updatedUser);
  }

  deleteUser(req, res) {
    const result = userService.remove(req.params.id);
    if (!result) return res.status(404).send("Usuário não encontrado");
    res.status(204).send();
  }

  register(req, res) {
    const novoUsuario = userService.register(req.body.user_email, req.body.user_password);
    if (novoUsuario) {
        console.log("Novo usuário criado:", novoUsuario);
        res.status(200).json(novoUsuario);
    } else {
        res.status(401).send('Erro ao criar usuário');
    }
}

  async login(req, res){
    if(await userService.login(req.body.user_email, req.body.user_password)){
      res.status(200).send('usuário logado'); 
    } else {
      res.status(401).send('usuário não autorizado'); 
    }
  }
}

module.exports = UserController;