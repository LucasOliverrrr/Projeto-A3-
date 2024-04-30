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
    return users.find((user) => user.user_id === id);
  }

  createUser(UserDTO) {
      users.push(UserDTO);
      return UserDTO;
  }

  update(userDTO) {
    const userIndex = users.findIndex((user) => user.id === userDTO.id);
    if (userIndex === -1) return null;
    users[userIndex] = userDTO;
    return userDTO;
  }

  remove(id) {
    const userIndex = users.findIndex((user) => user.user_id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }

  register(user_email, user_password) {
    const repetido = users.find((user) => user.user_email === user_email);
    if (repetido) {
        console.log("Já existe uma conta com este email");
        return false;
    } else {
        const novoUsuario = new UserDTO({
            user_id: uuidv4(), // Gerando um ID único
            user_email: user_email,
            user_password: user_password
        });
        users.push(novoUsuario);
        return novoUsuario;
    }
}

  login(user_email, user_password) {
    const userIndex = users.findIndex((user) => user.user_email === user_email);
    if (userIndex === -1) return false; // Usuário não encontrado
    try {
      const match = bcrypt.compareSync(user_password, users[userIndex].user_password);
      return match; // Retorna true se as senhas coincidirem, senão false
    } catch (error) {
      throw new Error("Erro na verificação da senha");
    }
  }
}

module.exports = UserService;