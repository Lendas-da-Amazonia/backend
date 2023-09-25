// escrevo o local onde está armazenado o banco de dados, nesse caso está na nuvem
const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  url: process.env.SERVER_API
}
