const express = require('express')

const db = require('./db/db')

const router = express.Router()

module.exports = router

// GET /api/v1/fruits
router.get('/', async (req, res) => {
  try {
    const fruits = await db.getFruits()
    res.json({ fruits })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// POST /api/v1/fruits
router.post('/', async (req, res) => {
  const newFruit = req.body
  try {
    const fruits = await db.addFruit(newFruit)
    res.json({ fruits })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// PUT /api/v1/fruits
router.put('/', async (req, res) => {
  const newFruit = req.body
  try {
    const fruits = await db.updateFruit(newFruit)
    res.json({ fruits })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// DELETE /api/v1/fruits
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const fruits = await db.deleteFruit(id)
    res.json({ fruits })
  } catch (err) {
    res.status(500).send(err.message)
  }
})
