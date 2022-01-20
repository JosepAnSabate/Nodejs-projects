const express = require('express');
const app = express();

const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')

// middleware
app.use(express.json())

// routes 
app.get('/hy', (req, res) =>{
    res.send('Task Manager app')
})

app.use('/api/v1/tasks', tasks)


const port = 2000

const start = async () => {
    try {
        await connectDB()
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()


