require('dotenv').config();
require('express-async-errors');

// secutity packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');




const express = require('express');
const app = express();
const connectDB  = require('./db/connect')
// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const authenticatedUser = require('./middleware/authentication')

app.use(rateLimiter({
  windowMS: 15*60*1000,//15minuts
  max: 100//100 req per window
}))

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter());


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authenticatedUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 9000;

const start = async () => {
  try {
    await connectDB().then(console.log('DB connected'))
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
