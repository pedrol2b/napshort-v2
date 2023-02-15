import router from '@/routes'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
dotenv.config()

const app = express()
app.enable('trust proxy')
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api', router)

app.listen(process.env.PORT || 3031)
