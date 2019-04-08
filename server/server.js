const path = require('path')
const express = require('express')

const routes = require('./routes')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/fruits', routes)

module.exports = server
