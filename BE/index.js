require("dotenv").config();

const express = require("express");
const cors = require("cors");
const configViewEngine = require("./config/viewEngine");
const db = require("./config/database");
const routes = require("./routes/v1/index.routes");
const { applyDefaults } = require("./models/user.model");


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


configViewEngine.configViewEngine(app);

routes(app)
db()
app.listen(PORT, ()=>{
  console.log(`App is listening on port: ${PORT}`)
})