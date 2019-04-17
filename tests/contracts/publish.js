const path = require('path')
const pact = require('@pact-foundation/pact-node')

const opts = {
  pactFilesOrDirs: [
    path.join(__dirname, 'pacts/react-client-express-server.json')
  ],
  pactBroker: 'http://localhost',
  consumerVersion: '1.0.',
  tags: ['test']
}

pact
  .publishPacts(opts)
  .then(() => {
    /* eslint-disable no-console */
    console.log('Pact contract publishing to http://localhost is complete!')
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('Pact contract publishing failed:', err)
  })
