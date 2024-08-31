import './config/alias-config'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routes } from './routes'
import path from 'path'

dotenv.config()

const app = express()

app.use(express.json({ limit: '20mb' }))
app.use(cors())
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use('/', routes)

if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export default app
