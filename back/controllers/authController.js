const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt= require('bcrypt')
require('dotenv').config()

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const foundUser = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).lean();
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized 1' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match)return res.status(401).json({message:'Unauthorized 2' })

    const accessToken= jwt.sign(foundUser,process.env.ACCESS_TOKEN_SECRET)

    res.cookie('token', accessToken, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 3600000
    });

    console.log(foundUser)
    res.status(200).json({name: foundUser.name})
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    try {
        const user = new User({ name, email, password: hashedPwd });
        await user.save();

        const userInfo= { _id: user._id, name: user.name, email: user.email }
        const accessToken= jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
        res.cookie('token', accessToken, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 3600000
        });
        res.status(200).json({name: user.name})}
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { login, register };
