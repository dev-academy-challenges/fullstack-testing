module.exports = {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
}

let fruits = [
  {
    id: 1,
    name: 'Banana',
    calories: 105
  }, {
    id: 2,
    name: 'Apple',
    calories: 95
  }, {
    id: 3,
    name: 'Feijoa',
    calories: 26
  }
]

// This function is careful to NOT return an instance of the global
// `fruits` variable so it can't be modified outside of this module.
function sort (fruitArray) {
  const allFruits = [...fruitArray]
  allFruits.sort((a, b) => a.id - b.id)
  return allFruits
}

async function getFruits () {
  return Promise.resolve(sort(fruits))
}

// These function also make copies the input parameters so outside code
// isn't able to inadvertently edit the objects in the fruits array.

async function addFruit (fruit) {
  const newFruit = { ...fruit }
  // Use an ID value 1 larger than the largest existing ID
  newFruit.id = fruits.reduce((acc, curr) => (curr.id > acc ? curr.id : acc), 0) + 1
  fruits.push(newFruit)
  return Promise.resolve(sort(fruits))
}

async function updateFruit (newFruit) {
  const updatedFruit = { ...newFruit }
  fruits = fruits.map(fruit => fruit.id === updatedFruit.id ? updatedFruit : fruit)
  return Promise.resolve(sort(fruits))
}

async function deleteFruit (id) {
  fruits = fruits.filter(fruit => fruit.id !== id)
  return Promise.resolve(sort(fruits))
}
