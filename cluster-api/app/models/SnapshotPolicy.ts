import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'


export default class SnapshotPolicy extends BaseModel {
  @column({ isPrimary: true })
  declare userId: string

  @column()
  declare policyName: string

  @column()
  declare directory: string

  @column()
  declare scheduleType: string

  @column()
  declare timeZone: string

  @column()
  declare snapshotTime: string

  @column()
  declare selectedDays: string

  @column()
  declare deleteOption: 'never' | 'afterDays'

  @column()
  declare deleteAfterDays: number | null

  @column()
  declare enableLockedSnapshots: boolean

  @column()
  declare enablePolicy: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

}