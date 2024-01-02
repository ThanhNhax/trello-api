/* eslint-disable no-console */
import express from 'express'
import { CLOSE_DB, CONNECT_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const startServer = () => {
  const app = express()
  // Nhận dữ liệu từ req.body
  app.use(express.json())

  // API v1
  app.use('/v1', APIs_V1)

  // middleware xu ly loi
  app.use(errorHandlingMiddleware)

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
