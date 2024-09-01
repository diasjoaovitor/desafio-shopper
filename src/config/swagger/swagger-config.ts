import swaggerJsdoc, { Options } from 'swagger-jsdoc'
import { postUploadDoc } from './post-upload-doc'
import { patchConfirmDoc } from './patch-confirm-doc'
import { getMeasuresDoc } from './get-list'

const swaggerDocs = {
  '/upload': {
    post: postUploadDoc
  },
  '/confirm': {
    patch: patchConfirmDoc
  },
  '/{customer_code}/list': {
    get: getMeasuresDoc
  }
}

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopper API',
      version: '1.0.0'
    },
    paths: swaggerDocs
  },
  apis: []
}

export const swaggerSpec = swaggerJsdoc(options)
