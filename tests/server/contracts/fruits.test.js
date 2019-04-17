const path = require('path')
const { Verifier } = require('@pact-foundation/pact')

require('babel-polyfill')
jest.mock('../../../server/db/db')

const db = require('../../../server/db/db') // this will get the mock db
const server = require('../../../server/server') // server will also get the mock db

const listeningServer = server.listen(8081)

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('validates the expectations of the Fruits API', () => {
    const opts = {
      providerVersion: '1.0.0',
      provider: 'express-server',
      logLevel: 'WARN', // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
      providerBaseUrl: 'http://localhost:8081',

      stateHandlers: {
        'Has some fruit': () => {
          db.reset()
          return Promise.resolve('Fruit data reset')
        }
      },

      pactBrokerUrl: 'http://localhost',
      publishVerificationResult: true,
      tags: ['test']

      // Local pacts
      // pactUrls: [
      //   path.join(__dirname, '../../contracts/pacts/react-client-express-server.json')
      // ]
    }

    return new Verifier(opts).verifyProvider().then(output => {
      /* eslint-disable-next-line no-console */
      // console.log(output)
      listeningServer.close()
    })
  })
})
