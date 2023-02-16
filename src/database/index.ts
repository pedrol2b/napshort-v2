import * as dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose'
dotenv.config()

mongoose.connect(`${process.env.MONGO_URL}${process.env.MONGO_DB}`, <ConnectOptions>{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise
export default mongoose
