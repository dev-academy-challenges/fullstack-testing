const path = require('path')
const { Verifier } = require('@pact-foundation/pact')

require('babel-polyfill')
jest.mock('../../../server/db')

const db = require('../../../server/db') // this will get the mock db
const server = require('../../../server/server') // server will also get the mock db

const listeningServer = server.listen(8081)

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('validates the expectations of the Fruits API', () => {
    const opts = {
      provider: 'Fruits API',
      logLevel: 'WARN', // DEBUG, INFO, WARN, ERROR
      providerBaseUrl: 'http://localhost:8081',

      stateHandlers: {
        'Has no fruit': () => {
          db.clear()
          return Promise.resolve(`Fruit removed to the database`)
        }
      },

      // Local pacts
      pactUrls: [
        path.join(__dirname, '../../contracts/pacts/react-client-express-server.json')
      ],

      providerVersion: '1.0.0'
    }

    return new Verifier(opts).verifyProvider().then(output => {
      /* eslint-disable-next-line no-console */
      // console.log(output)
      listeningServer.close()
    })
  })
})
