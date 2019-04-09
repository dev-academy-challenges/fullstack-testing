/* global provider */

const { getFruits } = require('../../client/apiClient')

describe('The Fruits API', () => {
  const url = 'http://localhost:8989/api/v1/fruits'

  // Copy this block once per interaction under test
  describe('getting all the fruits', () => {
    const expectedResponse = { fruits: [{ id: 1, name: 'apple', calories: 100 }] }

    beforeEach(() => {
      const interaction = {
        uponReceiving: 'requesting all the fruits',
        withRequest: {
          method: 'GET',
          path: '/api/v1/fruits',
          query: '',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: expectedResponse
        }
      }
      return provider.addInteraction(interaction)
    })

    // add expectations
    it('returns an array of fruit objects', () => {
      return getFruits(url)
        .then(res => {
          expect(res).toEqual(expectedResponse.fruits)
        })
    })
  })
})
