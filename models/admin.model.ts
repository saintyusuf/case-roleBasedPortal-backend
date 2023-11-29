import {Schema, model} from "mongoose"

interface interfaceAdmin {
  name: string,
  email: string,
  password: string,
  role: string
}

const adminSchema = new Schema<interfaceAdmin>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, require: true},
  role: {type: String, required: true},
})

module.exports = model("Admin", adminSchema)