export const getMeasuresDoc = {
  tags: ['Leituras'],
  summary: 'Lista as leituras de um cliente',
  parameters: [
    {
      in: 'path',
      name: 'customer_code',
      required: true,
      schema: {
        type: 'string',
        example: '123456'
      },
      description: 'Código do cliente'
    },
    {
      in: 'query',
      name: 'measure_type',
      schema: {
        type: 'string',
        enum: ['WATER', 'GAS'],
        example: 'WATER'
      },
      description: 'Tipo de medida para filtrar (opcional)'
    }
  ],
  responses: {
    200: {
      description: 'Lista de leituras retornada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                measure_uuid: {
                  type: 'string',
                  example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
                },
                measure_type: {
                  type: 'string',
                  example: 'WATER'
                },
                measure_value: {
                  type: 'number',
                  example: 12345
                },
                measure_datetime: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-08-29T00:00:00Z'
                }
              }
            }
          }
        }
      }
    },
    400: {
      description: 'Tipo de medida inválido',
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
                example: 'Tipo de medida deve ser "WATER" ou "GAS"'
              }
            }
          }
        }
      }
    },
    404: {
      description: 'Nenhuma leitura encontrada',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error_code: {
                type: 'string',
                example: 'MEASURES_NOT_FOUND'
              },
              error_description: {
                type: 'string',
                example: 'Nenhuma leitura encontrada'
              }
            }
          }
        }
      }
    }
  }
}
