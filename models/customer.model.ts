import {Schema, model} from "mongoose"

export interface interfaceCustomer {
  name: string,
  email: string,
  password: string,
  role: string,
  projects: {
    name?: string
    description?: string
    status?: number
  }[],
  messages: string[]
}

const customerSchema = new Schema<interfaceCustomer>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  projects: [
    {
      name: {type: String, required: true},
      description: {type: String, required: true},
      status: {type: Number, required: true}
    }
  ],
  messages: [{type: String, required: true}]
})

module.exports = model("Customer", customerSchema)