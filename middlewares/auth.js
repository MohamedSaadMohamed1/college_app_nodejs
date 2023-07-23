const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided' });

    try{
        req.token = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.'})
    }
}