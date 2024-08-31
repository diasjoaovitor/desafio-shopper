import { TMeasureType } from '@/models'

export interface ILLM {
  measureImage(data: {
    imageBase64: string
    measureType: TMeasureType
  }): Promise<number>
}
