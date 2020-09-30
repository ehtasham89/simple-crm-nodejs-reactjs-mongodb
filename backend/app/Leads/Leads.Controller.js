const createError = require('http-errors')
const Leads = require('./Leads.model')
const { leadsSchema, leadsUpdateSchema } = require('../helpers/validation_schema')

module.exports = {
  list: async (req, res, next) => {
    try {
      const data = await Leads.find({})
      if (!data.length)
        throw createError.NotFound(`Client list is empty.`)

      res.send({ data })
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  create: async (req, res, next) => {
    try {
      const result = await leadsSchema.validateAsync(req.body)
      const client = await Leads.findOne({ email: result.email })
      
      if (client) throw createError.Conflict('client already registered with this email')

      const clientData = new Leads(client)

      const savedClient = clientData.save()

      res.send({ data: savedClient, message: "Client data saved successfully" })
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await leadsUpdateSchema.validateAsync(req.body)

      if (!result.length) throw createError.NotFound("please provide at least one property for update")

      const client = await Leads.findById(id)
      if (!client) throw createError.NotFound('client not found!')

      Object.assign(client, result);

      const leadsAction = new Leads(client);
      const savedClient = await leadsAction.updateOne();

      res.send({ data: savedClient, message: "Client data updated successfully"})
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id
      const client = await Leads.findById(id)

      if (!client) throw createError.NotFound('Client not found!')

      const clientAction = new Leads(client);
      const delClient = await clientAction.deleteOne();

      res.send({ data: delClient, message: "Leads deleted successfully"})
    } catch (error) {
      console.error(error);
      next(error)
    }
  },
}
