const { Pool } = require('pg')

const pool = new Pool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME     || 'solocash',
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || ''
})

pool.connect((err) => {
    if (err) {
        console.error('[DB] Falha ao conectar ao PostgreSQL:', err.message)
    } else {
        console.log('[DB] Conectado ao PostgreSQL com sucesso!')
    }
})

module.exports = pool
