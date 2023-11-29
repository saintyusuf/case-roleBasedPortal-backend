const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const adminController = require("./controllers/admin.controller")
const customerController = require("./controllers/customer.controller")
const projectController = require("./controllers/project.controller")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/admin", adminController)
app.use("/customer", customerController)
app.use("/project", projectController)

const dbUrl = "mongodb://localhost:27017/case-9"
const appPort = process.env.PORT || 5001

mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err:any) => console.log(err))

app.listen(appPort, () => console.log(`Server is running on port ${appPort}`))