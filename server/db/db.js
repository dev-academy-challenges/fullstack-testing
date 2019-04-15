const connection = require('./connection')

module.exports = {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
}

// This function is careful to NOT return an instance of the global
// `fruits` variable so it can't be modified outside of this module.
function sort (fruitArray) {
  const allFruits = [...fruitArray]
  allFruits.sort((a, b) => a.id - b.id)
  return allFruits
}

async function getFruits (db = connection) {
  return db('fruits').select().then(sort)
}

async function addFruit (fruit, db = connection) {
  return db('fruits')
    .insert(fruit)
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

async function updateFruit (newFruit, db = connection) {
  return db('fruits')
    .where('id', newFruit.id)
    .update(newFruit)
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

async function deleteFruit (id, db = connection) {
  return db('fruits')
    .where('id', id)
    .del()
    .then(() => db)
    .then(getFruits)
    .then(sort)
}
