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
    if (!user_id) throw new Error("ID é necessário");
    this.user_id = user_id;
  }

  // Validação do formato de e-mail
  setEmail(user_email) {
    if (!/^\S+@\S+\.\S+$/.test(user_email))
      throw new Error("Formato de emial inválido");
    this.user_email = user_email;
  }

  // Validações de senha
  async setPassword(user_password) {
    if (user_password.length < 8)
      throw new Error("A senha tem que ter no minimo 8 caracteres");
    if (!/[A-Z]/.test(user_password))
      throw new Error("A senha tem que conter pelo menos uma letra maiuscula");
    if (!/[a-z]/.test(user_password))
      throw new Error("A senha tem que conter pelo menos uma letra minuscula");
    if (!/\d/.test(user_password))
      throw new Error("A senha tem que conter pelo menos um número");
    if (!/[!@#$%^&*]/.test(user_password))
      throw new Error(
        "A senha tem que conter pelo menos um caracter especial (!@#$%^&*)"
      );

    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(user_password, salt);
      this.user_password = hashedPassword;
    } catch (error) {
      throw new Error("Erro ao criar a senha");
    }
  }

}

module.exports = UserDTO;