const User = require('../models/User');
const { StatusCodes } =require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async(req, res) => {
    const user = await User.create({...req.body}) //spread operator 
    //console.log(user);
    const token = user.createJWT()
    res
        .status(StatusCodes.CREATED)
        .json({ user:{ name: user.name }, token }) // getting the username and yoken
}

const login = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw new BadRequestError('Pleade provide user and password')
    }
    const user = await User.findOne({email})

    // compare password
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid password')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
    
}

module.exports = {
    register,
    login
}