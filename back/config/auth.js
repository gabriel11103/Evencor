const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware para autenticar tokens
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];  // Obtener el token del header
    if (!token) return res.sendStatus(401);  // No autorizado si no hay token

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);  // Token inválido
        req.user = user;  // Guardar el usuario en la request
        next();
    });
}

// Middleware para autenticar usuarios con rol de admin
function authenticateAdmin(req, res, next) {
    authenticateToken(req, res, () => {
        if (req.user.role !== 'admin') return res.sendStatus(403);  // Solo admin puede acceder
        next();
    });
}

module.exports = { authenticateToken, authenticateAdmin };
