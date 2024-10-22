import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'snapshot_policies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('user_id').primary().notNullable()
      table.string('policy_name').notNullable()
      table.string('directory').notNullable()
      table.string('schedule_type').notNullable()
      table.string('time_zone').notNullable()
      table.time('snapshot_time').notNullable()
      table.json('selected_days').notNullable()
      table.enum('delete_option', ['never', 'afterDays']).notNullable()
      table.integer('delete_after_days').nullable()
      table.boolean('enable_locked_snapshots').defaultTo(false)
      table.boolean('enable_policy').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}