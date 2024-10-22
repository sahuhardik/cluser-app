import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

/**
 * Cluster model representing a cluster entity in the 'clusters' table.
 */
export default class Cluster extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare name: string;

  @column()
  declare status: string;

  @column()
  declare description?: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
