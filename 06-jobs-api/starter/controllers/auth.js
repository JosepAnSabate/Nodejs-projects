const User = require('../models/User');
const { StatusCodes } =require('http-status-codes')
const bcrypt = require('bcryptjs')


const register = async(req, res) => {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10);// more genSalt more secure password
    const hashPassword = await bcrypt.hash(password, salt)

    const tempUser = {name,email,password:hashPassword}



    const user = await User.create({...tempUser}) //spread operator 
    //console.log(user);
    
    res.status(StatusCodes.CREATED).json({ user })

}

const login = async(req, res) => {
    res.send('login use')
}

module.exports = {
    register,
    login
}