import { Request, Response } from "express"
const Express = require("express")
const Admin = require("../models/admin.model")
const router = Express.Router()
const jwt = require("jsonwebtoken")
const verifyToken = require("../middlewares/verifyToken")

// get all admins
router.get("/", verifyToken({permissionFor: ["admin"]}), async (req: Request, res: Response) => {

  await Admin.find()
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(404).json({message: err.message}))

})

// get admin by id
router.get("/:id", verifyToken({permissionFor: ["admin"]}), async (req: Request, res: Response) => {
  
  await Admin.findById(req.params.id, "-password")
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(404).json({message: err.message}))

})

// update admin by id
router.put("/:id", verifyToken({permissionFor: ["admin"]}), (req: Request, res: Response) => {
  
  const { name, email, password } = req.body

  Admin.findByIdAndUpdate(req.params.id, {name, email, password})
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(400).json({message: err.message}))

})

// delete admin by id
router.delete("/:id", verifyToken({permissionFor: ["admin"]}), async (req: Request, res: Response) => {
  
  Admin.findByIdAndDelete(req.params.id)
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(400).json({message: err.message}))

})

// create admin
router.post("/", verifyToken({permissionFor: ["admin"]}), (req: Request, res: Response) => {
  
  const { name, email, password } = req.body
  
  new Admin({
    name,
    email,
    password,
    role: "admin"
  }).save()
    .then((data:any) => res.json(data))
    .catch((err:any) => res.status(400).json({message: err.message}))

})

// login admin
router.post("/login", async (req: Request, res: Response) => {
  
  const { email, password } = req.body

  const foundedData = await Admin.findOne({email, password}, "-password")
  const token = jwt.sign({user: foundedData}, "case-9", {expiresIn: "1h"})

  if (foundedData) {
    res.json(token)
  } else if (email === "admin" && password === "admin") { // create admin if not exists to keep development process going

    const newAdmin = new Admin({
      name: "admin",
      email: "admin",
      password: "admin",
      role: "admin"
    })
    
    newAdmin.save()
      .then((res:any) => res.json(jwt.sign({user: res}, "case-9", {expiresIn: "24h"})))
      .catch((err: any) => res.status(400).json({message: err.message}))

  } else {
    res.status(404).json({message: "Email or password is incorrect"})
  }

})

module.exports = router