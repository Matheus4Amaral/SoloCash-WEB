const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const JWT_SECRET = process.env.JWT_SECRET || 'solocash_secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h'

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' })
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1 LIMIT 1',
            [email.toLowerCase().trim()]
        )

        const usuario = rows[0]

        if (!usuario) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' })
        }

        if (usuario.status === 0) {
            return res.status(403).json({ message: 'Conta desativada.' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash)

        if (!senhaValida) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' })
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        )

        return res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        })
    } catch (err) {
        console.error('[auth/login]', err)
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
})

// POST /api/auth/registrar
router.post('/registrar', async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' })
    }

    try {
        const { rows: existente } = await pool.query(
            'SELECT id FROM usuarios WHERE email = $1 LIMIT 1',
            [email.toLowerCase().trim()]
        )

        if (existente.length > 0) {
            return res.status(409).json({ message: 'Email já cadastrado.' })
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        const { rows } = await pool.query(
            `INSERT INTO usuarios (nome, email, senha_hash, status)
             VALUES ($1, $2, $3, 1)
             RETURNING id, nome, email`,
            [nome.trim(), email.toLowerCase().trim(), senhaHash]
        )

        return res.status(201).json({ message: 'Usuário criado com sucesso.', usuario: rows[0] })
    } catch (err) {
        console.error('[auth/registrar]', err)
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
})

module.exports = router
