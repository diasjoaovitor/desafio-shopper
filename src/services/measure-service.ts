import { knex } from '@/database'
import { IMeasure } from '@/interfaces'
import {
  TMeasureRequestBodyModel,
  TMeasureDBModel,
  TMeasureConfirmRequestBodyModel,
  TMeasureListRequestModel
} from '@/models'

export class MeasureService implements IMeasure {
  async measureExists({
    customer_code,
    measure_datetime,
    measure_type
  }: TMeasureRequestBodyModel): Promise<boolean> {
    const existingMeasure = await knex('measures')
      .where('customer_code', customer_code)
      .where('measure_type', measure_type)
      .where('measure_datetime', measure_datetime)
      .andWhereRaw(
        "date_trunc('month', measure_datetime) = date_trunc('month', ?::date)",
        [measure_datetime]
      )
      .first()
    return existingMeasure
  }

  async createMeasure(data: TMeasureDBModel): Promise<void> {
    await knex('measures').insert(data)
  }

  async getMeasureByUuid(
    measure_uuid: string
  ): Promise<TMeasureDBModel | null> {
    const result = await knex('measures')
      .where('measure_uuid', measure_uuid)
      .first()
    return result
  }

  async confirmMeasure({
    measure_uuid,
    confirmed_value
  }: TMeasureConfirmRequestBodyModel): Promise<void> {
    await knex('measures')
      .where('measure_uuid', measure_uuid)
      .update({ has_confirmed: true, measure_value: confirmed_value })
  }

  async getMeasures({
    customer_code,
    measure_type
  }: TMeasureListRequestModel): Promise<TMeasureDBModel[]> {
    if (measure_type) {
      return knex('measures')
        .where('customer_code', customer_code)
        .where('measure_type', measure_type.toUpperCase())
        .orderBy('measure_datetime', 'desc')
    }
    return knex('measures')
      .where('customer_code', customer_code)
      .orderBy('measure_datetime', 'desc')
  }
}
