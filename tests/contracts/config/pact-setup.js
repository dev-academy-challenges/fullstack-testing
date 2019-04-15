const path = require('path')

const { Pact } = require('@pact-foundation/pact')

const port = 8989

global.provider = process.env.NODE_ENV === 'pactTest' && new Pact({
  port: port,
  log: path.join(__dirname, '..', 'logs', 'mockserver-integration.log'),
  dir: path.join(__dirname, '..', 'pacts'),
  spec: 2,
  logLevel: 'WARN', // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'react-client',
  provider: 'express-server'
})
