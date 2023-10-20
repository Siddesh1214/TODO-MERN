const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type :String ,
  },
  password: {
    type  :String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // coktok: {
  //   type: String,
    
  // }


})

module.exports = mongoose.model('User', userSchema);