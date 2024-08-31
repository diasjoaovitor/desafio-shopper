import {
  TMeasureRequestBodyModel,
  TMeasureDBModel,
  TMeasureConfirmRequestBodyModel,
  TMeasureListRequestModel
} from '@/models'

export interface IMeasure {
  measureExists(data: TMeasureRequestBodyModel): Promise<boolean>
  createMeasure(data: TMeasureDBModel): Promise<void>
  getMeasureByUuid(measure_uuid: string): Promise<TMeasureDBModel | null>
  confirmMeasure(data: TMeasureConfirmRequestBodyModel): Promise<void>
  getMeasures(data: TMeasureListRequestModel): Promise<TMeasureDBModel[]>
}
