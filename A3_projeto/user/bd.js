const { v4: uuidv4 } = require("uuid");

const users = [
    {
      user_id: uuidv4(),
      user_email: "teste@teste.com",
      user_password: "123456",
    },
    {
      user_id: uuidv4(),
      user_email: "teste@2teste.com",
      user_password: "123456",
    },
];

module.exports = users;