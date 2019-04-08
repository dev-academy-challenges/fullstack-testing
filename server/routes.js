const express = require('express')

const db = require('./db')

const router = express.Router()

module.exports = router

// GET /api/v1/fruits
router.get('/', async (req, res) => {
  const fruits = await db.getFruits()
  res.json({ fruits })
})

// POST /api/v1/fruits
router.post('/', async (req, res) => {
  const newFruit = req.body
  const fruits = await db.addFruit(newFruit)
  res.json({ fruits })
})

// PUT /api/v1/fruits
router.put('/', async (req, res) => {
  const newFruit = req.body
  const fruits = await db.updateFruit(newFruit)
  res.json({ fruits })
})

// DELETE /api/v1/fruits
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const fruits = await db.deleteFruit(id)
  res.json({ fruits })
})
