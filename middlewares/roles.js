function moderator(req, res, next) {
    if (res.token.role in [ 'moderator', 'admin' ])
        return res.status(403).json({ success: false, message: 'Access denied.'})
    next();
}

function admin(req, res, next) {
    if (res.token.userRole !== 'admin')
        return res.status(403).json({ success: false, message: 'Access denied.'})
    next();
}

module.exports = {
    admin,
    moderator
}