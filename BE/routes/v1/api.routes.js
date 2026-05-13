const express = require("express")
const router = express.Router()
const controller = require("../../controllers/user.controller")
const authMiddleware = require("../../middlewares/auth")
const delay = require("../../middlewares/delay")
router.all(/(.*)/, authMiddleware.auth);

router.get("/",(req, res)=>{
  return res.status(200).json('Hello World API')
});

router.post("/register", controller.createUser)
router.post('/login', controller.handleLogin)

router.get("/user", controller.getUser)
router.get("/account",delay.delay, controller.getAccount)

module.exports = router