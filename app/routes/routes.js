const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller')

// verificar status de servidor
router.get('/', controller.Index)

// cadastra o usuário
router.post('/', controller.cadastrarUsuario)

// listar o usuário
router.get('/users', controller.listarUsuarios)

// Encontrar algum usuário
router.post('/users', controller.encontrarUsuario)

// Deleta algum usuário por nome
router.delete('/users', controller.deletarUsuario)

// verifica o usuário é válido e loga
router.post('/login', controller.logarUsuario)

module.exports = router
