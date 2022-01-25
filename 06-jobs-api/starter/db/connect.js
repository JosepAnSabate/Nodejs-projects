const mongoose = require('mongoose')


const connectionString =  `mongodb://localhost/fourtoffourdb`

const connectDB = () => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB

