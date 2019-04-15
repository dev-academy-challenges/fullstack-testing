require('babel-polyfill')
const request = require('supertest')

const server = require('../../server/server')
const db = require('../../server/db') // the mock

jest.mock('../../server/db')

beforeEach(() => {
  db.reset()
})

test('POST / adds a new fruit', () => {
  return request(server)
    .post('/api/v1/fruits')
    .send({ name: 'durian', calories: 26 })
    .then(res => {
      expect(res.body.fruits).toHaveLength(4)
    })
})

test('GET / returns all the fruits', () => {
  return request(server)
    .get('/api/v1/fruits')
    .then(res => {
      expect(res.body.fruits).toHaveLength(3)
    })
})
