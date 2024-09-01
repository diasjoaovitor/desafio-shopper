export const postUploadDoc = {
  tags: ['Leituras'],
  summary: 'Faz o upload de uma imagem e registra a leitura',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            customer_code: {
              type: 'string',
              example: '123456',
              description: 'Código do cliente'
            },
            image: {
              type: 'string',
              format: 'base64',
              example: 'Zm9vYmFy',
              description: 'Imagem em formato base64'
            },
            measure_datetime: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-29T00:00:00Z',
              description: 'Data e hora da medição'
            },
            measure_type: {
              type: 'string',
              enum: ['WATER', 'GAS'],
              example: 'WATER',
              description: 'Tipo de medida'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Upload bem-sucedido e leitura registrada',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              image_url: {
                type: 'string',
                example:
                  'https://example.com/uploads/f47ac10b-58cc-4372-a567-0e02b2c3d479.png'
              },
              measure_value: {
                type: 'number',
                example: 12345
              },
              measure_uuid: {
                type: 'string',
                example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
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
                example: 'Imagem base64 inválida'
              }
            }
          }
        }
      }
    },
    409: {
      description: 'Leitura do mês já realizada',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error_code: {
                type: 'string',
                example: 'DOUBLE_REPORT'
              },
              error_description: {
                type: 'string',
                example: 'Leitura do mês já realizada'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Erro interno',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error_code: {
                type: 'string',
                example: 'INTERNAL_ERROR'
              },
              error_description: {
                type: 'string',
                example: 'Ocorreu um erro ao processar a leitura'
              }
            }
          }
        }
      }
    }
  }
}
