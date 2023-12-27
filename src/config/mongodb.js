import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'
//
//password
// RHJrjk0X1SJF5Ytl

//khởi tạp một đối tượng trelloDatabaseInstance ban đầu là null (vì chưa có kết nối với db)

let trelloDatabaseInstance = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB với URI đã khai báo trong thân của client
  await client.connect()

  trelloDatabaseInstance = client.db(env.DATABASE_NAME)
}

export const get_db = () => {
  if (!trelloDatabaseInstance)
    throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
export const CLOSE_DB = async () => {
  await client.close()
}
