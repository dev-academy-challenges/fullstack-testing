const path = require('path')

const { Pact } = require('@pact-foundation/pact')

global.port = 8989

global.provider = new Pact({
  port: global.port,
  log: path.join(__dirname, '..', 'logs', 'mockserver-integration.log'),
  dir: path.join(__dirname, '..', 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'react-client',
  provider: 'express-server'
})
