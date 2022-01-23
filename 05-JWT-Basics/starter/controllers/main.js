const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    // mongo  validation or
    // Joi, setup additional layer of validation with joi package   or
    // check in the controller (used in this project)

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password, no token provided')
      }
    
    const id = new Date().getDate()

    const token = jwt.sign({id, username}, process.env.JWT_SECRET || jwtSecret , {expiresIn:'30d'})
    console.log(username, password);
    res.status(200).json({msg: 'user crreated', token})
  }

const dashboard = async(req, res) => {
    const authHeader = req.headers.authorization;
    //console.log(req.headers);
    //console.log(authHeader);
    if (!authHeader ) {    
        res.send('Please provide email and password, no token provided')
    }
    const token = authHeader.split(' ')[1]
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        //console.log(decoded.username);
      const luckyNumber = Math.floor(Math.random()*100)
      res.status(200).json({msg: `Hello ${decoded.username}`, secret: 
      `Here is your authorized data, your lucky number is ${luckyNumber}`})
    } catch (error) {
        res.send('Not token provided')
    }
    
}


  module.exports = {
      login, dashboard
  }