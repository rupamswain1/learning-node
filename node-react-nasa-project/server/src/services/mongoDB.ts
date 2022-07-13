import { connect, connection,disconnect } from 'mongoose'

connection.once('open', () => {
  console.log('MongoDB connection Eshtablished')
})

connection.on('error', () => {
  console.log('mongoDB connection failed')
})

const MONGO_URL = process.env.mongo_url || 'dummy url'

export const mongoConnect = async () => {
  //   console.log(MONGO_URL)
  await connect(MONGO_URL)
}

export const mongoDisconnect=async ()=>{
    await disconnect();
}