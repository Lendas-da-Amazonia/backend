const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Classe User
const userSchema = new Schema({
  nome: String,
  email: String,
  senha: String
})

module.exports = mongoose.model('usuarios', userSchema)
