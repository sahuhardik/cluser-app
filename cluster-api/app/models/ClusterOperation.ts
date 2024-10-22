import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import { ClusterOperationType } from '../enums.js';
import Cluster from './Cluster.js';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

/**
 * ClusterOperation model representing a single read/write operation on a cluster.
 * It records details such as the operation type, the number of bytes transferred, and the operation duration.
 */
export default class ClusterOperation extends BaseModel {
  
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare clusterId: string;

  @column()
  declare operationType: ClusterOperationType;

  @column()
  declare bytes: number;

  @column()
  declare duration: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => Cluster)
  public cluster!: BelongsTo<typeof Cluster>;
}
