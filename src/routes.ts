import { Router } from 'express'
import { validateConfirm, validateList, validateUpload } from './middlewares'
import { confirmMeasure, getMeasures, uploadImage } from './controllers'

const routes = Router()
routes.get('/', (_, res) => res.redirect('/docs'))
routes.post('/upload', validateUpload, uploadImage)
routes.patch('/confirm', validateConfirm, confirmMeasure)
routes.get('/:customer_code/list', validateList, getMeasures)

export { routes }
