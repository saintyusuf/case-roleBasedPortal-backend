import { Request, Response } from "express"
const Express = require("express")
const Customer = require("../models/customer.model")
const router = Express.Router()
const verifyToken = require("../middlewares/verifyToken")

// get all projects
router.get("/", verifyToken({permissionFor: ["admin"]}), async (req: Request, res: Response) => {

  await Customer.find({}, "projects")
  .then((data:any) => {
    const projectsLocal:any = []
    data.forEach((customer:any) => {
      customer.projects.forEach((project:any) => {
        projectsLocal.push({_id: customer._id, project})
      })
    })
    res.json(projectsLocal)
  })
  .catch((err:any) => res.status(404).json({message: err.message}))

})

// get all projects by customer id
router.get("/:customerId", verifyToken({permissionFor: ["admin", "customer"]}), async (req: Request, res: Response) => {

  await Customer.find({_id: req.params.customerId}, "projects")
  .then((data:any) => {
    // const projectsLocal:any = []

    // data.projects.forEach((project:any) => {
    //   projectsLocal.push({_id: data._id, project})
    // })

    res.json(data)
  })
  .catch((err:any) => res.status(404).json({message: err.message}))

})

// get project by customer & project ids
router.get("/:customerId/:projectId", verifyToken({permissionFor: ["admin", "customer"]}), async (req: Request, res: Response) => {
  
  await Customer.find({_id: req.params.customerId, "projects._id": req.params.projectId }, "projects.$")
  .then((data:any) => {
    const projectLocal = {
      _id: data[0]._id,
      project: data[0].projects[0]
    }
    res.json(projectLocal)
  })
  .catch((err:any) => res.status(404).json({message: err.message}))

})

// update project by customer & project ids
router.put("/:customerId/:projectId", verifyToken({permissionFor: ["admin", "customer"]}), (req: Request, res: Response) => {
  
  const { name, description, status } = req.body
  
  Customer.findOneAndUpdate({_id: req.params.customerId, "projects._id": req.params.projectId }, {$set: {"projects.$": {name, description, status}}})
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(400).json({message: err.message}))

})

// delete project by customer & project ids
router.delete("/:customerId/:projectId", verifyToken({permissionFor: ["admin", "customer"]}), async (req: Request, res: Response) => {
  
  Customer.findOneAndUpdate({_id: req.params.customerId}, {$pull: {projects: {_id: req.params.projectId}}})
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(400).json({message: err.message}))

})

// create project customer id
router.post("/:customerId", verifyToken({permissionFor: ["admin", "customer"]}), (req: Request, res: Response) => {
  
  const { name, description, status } = req.body

  Customer.findByIdAndUpdate(req.params.customerId, {$push: {projects: {name, description, status}}})
  .then((data:any) => res.json(data))
  .catch((err:any) => res.status(400).json({message: err.message}))

})

module.exports = router