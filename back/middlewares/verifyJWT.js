const jwt = require('jsonwebtoken')
const verifyJWT = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        console.log("no token provided")
        return res.status(401).json({ message: 'Unauthorized' })
    }
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) {
                console.log("token not valid")
                return res.status(403).json({message: 'Forbidden'})
            }
            console.log("user: "+user)
            req.userId = user._id
            next()
        }
    )
}
module.exports = {verifyJWT}