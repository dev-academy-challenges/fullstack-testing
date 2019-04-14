/* global provider */
const { Matchers } = require('@pact-foundation/pact')

const { getFruits } = require('../../../client/apiClient')

const { eachLike } = Matchers

describe('The Fruits API', () => {
  const url = 'http://localhost:8989/api/v1/fruits'

  // Copy this block once per interaction under test
  describe('getting all the fruits', () => {
    const fruitsBodyExpectation = { fruits: eachLike({ id: 1, name: 'apple', calories: 100 }) }

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
})
