import { BaseSchema } from '@adonisjs/lucid/schema';

export default class Clusters extends BaseSchema {
  protected tableName = 'clusters';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();

      table.string('name', 255).notNullable();

      table.string('status', 50).notNullable();

      table.text('description').nullable();

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());

      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
