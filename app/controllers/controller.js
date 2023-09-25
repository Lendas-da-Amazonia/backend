const mongoose = require('mongoose')

//exportar os modelos
const Usuarios = mongoose.model('usuarios')

exports.Index = async (req, res) => {
  res.send('Servidor Online')
}

// Listar usuários

exports.listarUsuarios = async (req, res) => {
  try {
    let encontrados = await Usuarios.find({})
    let total = await Usuarios.find({}).count()
    res.status(200).json({ message: `${total} usuarios cadastrados`, encontrados })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

// Cadastra usuários

exports.cadastrarUsuario = async (req, res) => {
  try {
    let usuarioNovo = await Usuarios.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    })
    res.status(200).json({ message: "Usuário Cadastrado" })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

// Logar um usuário
exports.logarUsuario = async (req, res) => {
  try {
    let tentativaDeUsuario = await Usuarios.findOne({ email: req.body.email, senha: req.body.senha })
    res.status(200).json({ user: tentativaDeUsuario })
  } catch (e) {
    res.status(500).json({ message: "Usuário não encontrado" })
  }
}


// Selecionar um usuário
exports.encontrarUsuario = async (req, res) => {
  try {
    let usuarioProcurado = await Usuarios.findOne({ nome: req.body.nome })
    res.status(200).json({ message: `Usuário: ${usuarioProcurado.nome} encontrado.` })
  } catch (e) {
    res.status(500).json({ message: "Usuário não encontrado" })
  }
}

// Deletar um usuário
exports.deletarUsuario = async (req, res) => {
  try {
    let usuarioTemp = await Usuarios.findOneAndDelete({ nome: req.body.nome })
    res.status(200).json({ message: `Usuário ${usuarioTemp.nome} foi deletado.` })
  } catch (e) {
    res.status(500).json({ message: "Usuário não encontrado" })
  }
}
