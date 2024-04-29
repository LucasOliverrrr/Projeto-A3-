const { v4: uuidv4 } = require("uuid");
const UserService = require("./user.service");
const userService = new UserService();
const UserDTO = require("./user.dto.js");

class UserController {
  createUser(req, res) {
    const { user_email, user_password } = req.body;
    const user = userService.create(user_email, user_password);
    res.json(user);
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

  async login(req, res){
    if(await userService.login(req.body.user_email, req.body.user_password)){
      res.status(200).send('usuário logado'); 
    } else {
      res.status(401).send('usuário não autorizado'); 
    }
  }
}

module.exports = UserController;