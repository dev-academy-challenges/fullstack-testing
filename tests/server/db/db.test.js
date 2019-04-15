require('babel-polyfill')
const env = require('./test-environment')
const db = require('../../../server/db/db')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getFruits returns all fruits', () => {
  return db.getFruits(testDb)
    .then(fruits => {
      expect(fruits.length).toBe(3)
    })
})

test('addFruit adds a fruit', () => {
  const fruit = {
    name: 'papaya',
    calories: 26
  }
  return db.addFruit(fruit, testDb)
    .then(fruits => {
      expect(fruits.length).toBe(4)
    })
})

test.skip('updateFruit updates a fruit', () => {})

test.skip('deleteFruit deletes a fruit', () => {})
