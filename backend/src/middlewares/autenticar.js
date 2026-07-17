const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'solocash_secret'

function autenticar(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' })
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET)
        req.usuario = payload
        next()
    } catch {
        return res.status(403).json({ message: 'Token inválido ou expirado.' })
    }
}

module.exports = autenticar
