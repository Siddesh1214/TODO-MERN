const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type :String,
    required: true,
    
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  isCompletd: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default:Date.now(),
  },
  updatedAt: {
    type: Date,
    default:Date.now(),
  },

})

module.exports = mongoose.model('Todo', todoSchema);