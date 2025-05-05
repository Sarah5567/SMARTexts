const jwt = require('jsonwebtoken')
const verifyJWT = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) return res.status(403).json({message: 'Forbidden'})
            req.userId = user._id
            next()
        }
    )
}
module.exports = {verifyJWT}