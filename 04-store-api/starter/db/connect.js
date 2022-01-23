
const mongoose = require('mongoose')

const connectionString =  `mongodb://localhost/secondoffourdb`

const connectDB = (url) => {
    return mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,     
    })
    .then(() => console.log('Connected to the db'))
    .catch((err) => console.log(err))
}

module.exports = connectDB
