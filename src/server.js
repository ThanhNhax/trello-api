/* eslint-disable no-console */
import express from 'express'
import { CLOSE_DB, CONNECT_DB, get_db } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'

const startServer = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello Thanh Nhax, I am running at http://${env.APP_HOST}:${
        env.APP_PORT ? env.APP_PORT : 3000
      }`
    )
  })

  // Thực hiện các công vic như close DB khi kill port
  exitHook(() => {
    console.log('Disconnected from MongoDB Cloud Atlas!')
    CLOSE_DB()
  })
}

// Ket noi DB
;(async () => {
  try {
    await CONNECT_DB()
    console.log('Connected to MongoDB Cloud Atlas!')

    startServer()
  } catch (e) {
    console.log(e)
    process.exit(0)
  }
})()
