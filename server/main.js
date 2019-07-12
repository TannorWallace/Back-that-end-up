import express from 'express'
import bp from 'body-parser'
import './db/dbconfig'
// import { Server } from 'https';

let port = 3000

let server = express()

server.use(bp.json({ limit: '50mb' }))

import BlogsController from './controllers/BlogsController'

server.use(express.static(__dirname + '/../blogger/public'));
server.use('/api/blogs', new BlogsController().router)

server.use((error, req, res, next) =>
  res.status(error.status || 400).send(error))

server.listen(port, () => {
  console.log("How many pirates does it take to turn to", port, "?")
})