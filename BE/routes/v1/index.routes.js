const homePageRoutes = require("../v1/home.routes")
const apiRoutes = require("../v1/api.routes")
module.exports = (app)=>{
  app.use("/",homePageRoutes)
  app.use("/v1/api", apiRoutes)
}