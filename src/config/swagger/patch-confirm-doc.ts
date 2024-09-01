export const patchConfirmDoc = {
  tags: ['Leituras'],
  summary: 'Confirma a leitura de uma medida',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            measure_uuid: {
              type: 'string',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              description: 'UUID da medida'
            },
            confirmed_value: {
              type: 'number',
              example: 12,
              description: 'Valor confirmado da medida'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Confirmação bem-sucedida',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: true
              }
            }
          }
        }
      }
    },
    400: {
      description: 'Dados inválidos',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error_code: {
                type: 'string',
                example: 'INVALID_DATA'
              },
              error_description: {
                type: 'string',
                example: 'UUID inválido'
              }
            }
          }
        }
      }
    },
    404: {
      description: 'Medida não encontrada',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error_code: {
                type: 'string',
                example: 'MEASURE_NOT_FOUND'
              },
              error_description: {
                type: 'string',
                example: 'Leitura não encontrada'
              }
            }
          }
        }
      }
    },
    409: {
      description: 'Medida já confirmada',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error_code: {
                type: 'string',
                example: 'CONFIRMATION_DUPLICATE'
              },
              error_description: {
                type: 'string',
                example: 'Leitura já confirmada'
              }
            }
          }
        }
      }
    }
  }
}
