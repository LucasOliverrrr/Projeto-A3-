const { v4: uuidv4 } = require("uuid");
const User = require("./user.entity.js");
const UserDTO = require("./user.dto.js");
const bcrypt = require("bcrypt");
const users = require("./bd.js");

/*
const users = [
  {
    id: uuidv4(),
    user_email: "teste@teste.com",
    user_password: "123456",
  },
  {
    id: uuidv4(),
    user_email: "teste@2teste.com",
    user_password: "123456",
  },
];
*/

class UserService {
  findAll() {
    return users.map((user) => new User(user));
  }

  findOne(id) {
    return users.find((user) => user.id === id);
  }

  create(userDTO) {
    users.push(userDTO);
    return userDTO;
  }

  update(userDTO) {
    const userIndex = users.findIndex((user) => user.id === userDTO.id);
    if (userIndex === -1) return null;
    users[userIndex] = userDTO;
    return userDTO;
  }

  remove(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }

  /*
  registro(user_email, user_password) {
    const repetido = users.find((user) => user.email == user_email)
    if (repetido) {
      console.log("Já existe uma conta com este email");
      return false
    };
  }
  */

  async login(user_email, user_password) {
    const userIndex = users.findIndex((user) => user.user_email === user_email);
    if (userIndex === -1) return false;
    try {
      return await bcrypt.compare(user_password, users[userIndex].user_password);
    } catch (error) {
      throw new Error("Erro na verificação da senha");
    }
  }
}

module.exports = UserService;