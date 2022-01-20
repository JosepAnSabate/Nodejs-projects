const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'must provide name'],
      trim: true, // ensure the strings you save through the schema are properly trimmed. " "
      maxlength: [20, 'name can not be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  })
  
  module.exports = mongoose.model('Task', TaskSchema) // name and dquema
  