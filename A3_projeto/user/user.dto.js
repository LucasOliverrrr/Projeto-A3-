const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserDTO {
  constructor({ user_id, user_email, user_password }, criar = false) {
    this.setId(user_id);
    this.setEmail(user_email);
    if (criar) {
      this.setPassword(user_password);
    } else {
      this.user_password = user_password;
    }
  }

  // Validação do ID
  setId(user_id) {
    user_id = uuidv4();
    if (!user_id) throw new Error("ID é necessário");
    this.user_id = user_id;
  }

  // Validação do formato de e-mail
  setEmail(user_email) {
    if (!/^\S+@\S+\.\S+$/.test(user_email))
      throw new Error("Formato de email inválido");
    this.user_email = user_email;
  }

  setPassword(user_password) {
    if (user_password.length < 8) {
      throw new Error("A senha tem que ter no mínimo 8 caracteres");
    }
    if (!/[A-Z]/.test(user_password)) {
      throw new Error("A senha tem que conter pelo menos uma letra maiúscula");
    }
    if (!/[a-z]/.test(user_password)) {
      throw new Error("A senha tem que conter pelo menos uma letra minúscula");
    }
    if (!/\d/.test(user_password)) {
      throw new Error("A senha tem que conter pelo menos um número");
    }
    if (!/[!@#$%^&*]/.test(user_password)) {
      throw new Error("A senha tem que conter pelo menos um caracter especial (!@#$%^&*)");
    }
  
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(user_password, salt);
    this.user_password = hashedPassword;
  }
}

module.exports = UserDTO;