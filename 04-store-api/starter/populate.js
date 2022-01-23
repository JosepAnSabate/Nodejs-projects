const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
  try {
    mongo_uri = 'mongodb://localhost/secondoffourdb' || process.env.MONGO_URI
    await connectDB(mongo_uri)
    await Product.deleteMany() // remove all te products currently there
    await Product.create(jsonProducts) //
    //console.log('Success!')
   process.exit(0) // 0 everything well, exit
  } catch (error) {
    console.log(error)
   process.exit(1)// doesn't exit
  }
}

start()
