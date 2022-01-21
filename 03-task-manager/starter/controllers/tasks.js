const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    
        const tasks = await Task.find({})
        res.status(200).json({ tasks }) 
        // res.status(200).json({ tasks, amount:tasks.length }) 
        // res.status(200).json({ status: "success", data: {tasks, amount: tasks.length}}) 
})
// ot withot our middlewae asyncWrapper
const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })  

    } catch (error) {
        res.status(500).json({ msg: error})
    }   
}

const getTask = asyncWrapper(async(req, res, next) => {
   // res.json({id:req.params.id})  
   
        const {id:taskID} = req.params
        const task = await Task.findOne({_id: req.params.id});//o {id:taskID}

        if (!task) {
           return next(createCustomError(`No task with id: ${taskID}`,404))
        }

        res.status(200).json({ task })
})

const updateTask = asyncWrapper(async(req, res) => { // patch will not update default values if propperty is not added
        const {id:taskID} = req.params

        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new:true, //returns the new value
            runValidators: true //for required fields
        })
        
        if (!task) {
            return next(createCustomError(`No task with id: ${taskID}`,404))

        }

        res.status(200).json({ task }) 
})

const deleteTask = asyncWrapper(async(req, res) => {
    
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        
        if (!task) {
           // return res.status(404).json({msg:`No task with id: ${taskID}`})
           return next(createCustomError(`No task with id: ${taskID}`,404))
          
        }


        res.status(200).json({ task })
        //or
        //res.status(200).send()
        // or 
        //res.status(200).json({ task: null, status: 'success' })
})    

module.exports = {
    getAllTasks,
    createTask,
    getTask, 
    updateTask, 
    deleteTask
}