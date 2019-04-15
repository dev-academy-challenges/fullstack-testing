/* global provider */
const { Matchers } = require('@pact-foundation/pact')

const {
  addFruit,
  getFruits,
  updateFruit,
  deleteFruit } = require('../../../client/apiClient')

const { like, eachLike } = Matchers

describe('The Fruits API', () => {
  const url = 'http://localhost:8989/api/v1/fruits'
  const fruitsBodyExpectation = { fruits: eachLike({ id: 1, name: 'apple', calories: 100 }) }

  // Copy this block once per interaction under test
  describe('getting all the fruits', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'requesting all the fruits',
        withRequest: {
          method: 'GET',
          path: '/api/v1/fruits',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: fruitsBodyExpectation
        }
      }
      return provider.addInteraction(interaction)
    })

    // add expectations
    it('returns an array of fruit objects', () => {
      return getFruits(url)
        .then(res => {
          expect(res[0]).toHaveProperty('id')
          expect(res[0]).toHaveProperty('name')
          expect(res[0]).toHaveProperty('calories')
        })
    })
  })

  describe('updating a fruit', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'updated fruits',
        withRequest: {
          method: 'PUT',
          path: '/api/v1/fruits',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: like({
            id: 2,
            name: 'Durian',
            calories: 44
          })
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: fruitsBodyExpectation
        }
      }
      return provider.addInteraction(interaction)
    })

    // add expectations
    it('returns an array of fruit objects', () => {
      const fruit = {
        id: 2,
        name: 'Durian',
        calories: 60
      }
      return updateFruit(fruit, url)
        .then(res => {
          expect(res[0]).toHaveProperty('id')
          expect(res[0]).toHaveProperty('name')
          expect(res[0]).toHaveProperty('calories')
        })
    })
  })

  describe('adding a fruit', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'added fruits',
        withRequest: {
          method: 'POST',
          path: '/api/v1/fruits',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: like({
            id: 2,
            name: 'Durian',
            calories: 44
          })
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: fruitsBodyExpectation
        }
      }
      return provider.addInteraction(interaction)
    })

    // add expectations
    it('returns an array of fruit objects', () => {
      const fruit = {
        id: 2,
        name: 'Durian',
        calories: 60
      }
      return addFruit(fruit, url)
        .then(res => {
          expect(res[0]).toHaveProperty('id')
          expect(res[0]).toHaveProperty('name')
          expect(res[0]).toHaveProperty('calories')
        })
    })
  })

  describe('deleting a fruit', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'all but the deleted fruits',
        withRequest: {
          method: 'DELETE',
          path: '/api/v1/fruits/2',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: fruitsBodyExpectation
        }
      }
      return provider.addInteraction(interaction)
    })

    // add expectations
    it('returns an array of fruit objects', () => {
      return deleteFruit(2, url)
        .then(res => {
          expect(res[0]).toHaveProperty('id')
          expect(res[0]).toHaveProperty('name')
          expect(res[0]).toHaveProperty('calories')
        })
    })
  })
})
