import { BaseSchema } from '@adonisjs/lucid/schema';
import { ClusterOperationType } from '../../app/enums.js';

export default class ClusterOperations extends BaseSchema {
  protected tableName = 'cluster_operations';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();

      table.uuid('cluster_id').notNullable().references('id').inTable('clusters').onDelete('CASCADE');

      table.enu('operation_type', [ClusterOperationType.READ, ClusterOperationType.WRITE]).notNullable();

      table.integer('bytes').notNullable();

      table.integer('duration').notNullable();

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());

      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
