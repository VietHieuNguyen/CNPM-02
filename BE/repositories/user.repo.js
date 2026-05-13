const User = require('../models/user.model')
module.exports.findUserByEmail =async (email)=>{
  return User.findOne({email:email})
}

module.exports.createUser = async(data)=>{
  return User.create(data)
}
module.exports.getAllUser = async ()=>{
  return User.find({}).select("-password")
}