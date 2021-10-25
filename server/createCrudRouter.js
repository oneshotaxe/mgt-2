const { Router } = require('express')

module.exports = function (modelName, populateMap) {
  const router = Router()

  router.post('/read', async (req, res) => {
    const Model = res.app.get('mongoose').models[modelName]
    let query = Model.find()
    if (req.query.extend) {
      for (let key in populateMap) {
        query = query.populate(populateMap[key])
      }
    }
    const docs = await query.exec()
    res.json(docs)
  })
  router.post('/readById', async (req, res) => {
    const Model = res.app.get('mongoose').models[modelName]
    let query = Model.findById(req.body._id)
    if (req.query.extend) {
      for (let key in populateMap) {
        query = query.populate(populateMap[key])
      }
    }
    const doc = await query.exec()
    res.json(doc)
  })
  router.post('/create', async (req, res) => {
    const Model = res.app.get('mongoose').models[modelName]
    const doc = new Model(req.body)
    await doc.save()
    res.json(doc)
  })
  router.post('/createMany', async (req, res) => {
    const Model = res.app.get('mongoose').models[modelName]
    await Model.insertMany(req.body)
    res.json('Ok')
  })
  router.post('/update', async (req, res) => {
    const Model = res.app.get('mongoose').models[modelName]
    const doc = await Model.findById(req.body._id)
    doc.set(req.body)
    await doc.save()
    res.json(doc)
  })
  router.post('/delete', async (req, res) => {
    const Model = res.app.get('mongoose').models[modelName]
    const doc = await Model.findById(req.body._id)
    doc.set(req.body)
    await doc.remove()
    res.json(doc)
  })
  router.post('/deleteMany', async (req, res) => {
    const Model = res.app.get('mongoose').models[modelName]
    await Model.deleteMany()
    res.json('Ok')
  })

  return router
}