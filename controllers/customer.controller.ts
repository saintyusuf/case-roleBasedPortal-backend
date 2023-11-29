import { Request, Response } from "express"
const Express = require("express")
const Customer = require("../models/customer.model")
const router = Express.Router()
const jwt = require("jsonwebtoken")
const verifyToken = require("../middlewares/verifyToken")

// get all customers
router.get("/", verifyToken({permissionFor: ["admin"]}), async (req: Request, res: Response) => {

  await Customer.find()
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(404).json({message: err.message}))

})

//get all customer and project length
router.get("/length", verifyToken({permissionFor: ["admin", "customer"]}), async (req: Request, res: Response) => {

  await Customer.find()
  .then((data:any) => {
    let customerLength = data.length
    let projectLength = 0
    data.forEach((customer:any) => {
      projectLength += customer.projects.length
    })
    res.json({customerLength, projectLength})
  })
  .catch((err:any) => res.status(404).json({message: err.message}))

})

// get customer by id
router.get("/:id", verifyToken({permissionFor: ["admin", "customer"]}), async (req: Request, res: Response) => {
  
  await Customer.findById(req.params.id, "-password")
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(404).json({message: err.message}))

})

// update customer by id
router.put("/:id", verifyToken({permissionFor: ["admin", "customer"]}), (req: Request, res: Response) => {
  
  const { name, email, password } = req.body

  Customer.findByIdAndUpdate(req.params.id, {name, email, password})
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(400).json({message: err.message}))

})

// delete customer by id
router.delete("/:id", verifyToken({permissionFor: ["admin"]}), async (req: Request, res: Response) => {

  Customer.findByIdAndDelete(req.params.id)
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(400).json({message: err.message}))

})

// create customer
router.post("/", verifyToken({permissionFor: ["admin"]}), (req: Request, res: Response) => {
  
  const { name, email, password } = req.body
  
  new Customer({
    name,
    email,
    password,
    role: "customer"
  }).save()
    .then((data:any) => res.json(data))
    .catch((err:any) => res.status(400).json({message: err.message}))

})

// login customer
router.post("/login", async (req: Request, res: Response) => {
  
  const { email, password } = req.body

  const foundedData = await Customer.findOne({email, password}, "-password")
  const token = jwt.sign({user:foundedData}, "case-9", {expiresIn: "24h"})

  if (foundedData) {
    res.json(token)
  } else {
    res.status(404).json({message: "Email or password is incorrect"})
  }

})

module.exports = router