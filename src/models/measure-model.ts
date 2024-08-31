export type TMeasureType = 'WATER' | 'GAS'

export type TMeasureRequestBodyModel = {
  image: string
  customer_code: string
  measure_datetime: string
  measure_type: TMeasureType
}

export type TMeasureResponseBodyModel = {
  image_url: string
  measure_value: number
  measure_uuid: string
}

export type TMeasureDBModel = Omit<TMeasureRequestBodyModel, 'image'> &
  TMeasureResponseBodyModel & {
    has_confirmed: boolean
    measure_uuid?: string
  }

export type TMeasureConfirmRequestBodyModel = {
  measure_uuid: string
  confirmed_value: number
}

export type TMeasureListRequestModel = {
  customer_code: string
  measure_type?: TMeasureType
}
