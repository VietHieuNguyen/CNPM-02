const userService = require("../services/user.services")

module.exports.createUser = async(req, res)=>{
  const {name, email, password} = req.body
  const data = await userService.createUserService(name,email, password);
  return res.status(200).json(data)
}
module.exports.handleLogin = async (req,res)=>{
  const {email, password} = req.body;
  const data = await userService.loginService(email, password);
  return res.status(200).json(data)
}
module.exports.getUser = async (req, res)=>{
  const data = await userService.getUserService()
  return res.status(200).json(data)
}
module.exports.getAccount = (req, res)=>{
  return res.status(200).json(req.user)
}