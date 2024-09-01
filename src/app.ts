import './config/alias-config'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config'
import { routes } from './routes'

dotenv.config()

const app = express()

app.use(express.json({ limit: '20mb' }))
app.use(cors())
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(routes)
if (require.main === module) {
  const PORT = process.env.PORT || 3005
  const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`
  app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`)
  })
}

export default app
