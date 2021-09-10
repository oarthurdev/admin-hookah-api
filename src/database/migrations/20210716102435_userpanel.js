exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('username').notNullable();
      table.integer('password').notNullable();
      table.string('email').notNullable();
      table.string('name').notNullable();
      table.string('birth_date').notNullable();
      table.string('secret_question').notNullable();
      table.string('secret_answer').notNullable();
      table.boolean('activated');
      table.string('photo');
      table.string('token');
      table.string('network_ip');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  };
    
    exports.down = function(knex, Promise) {
      return knex.schema.dropTable('users');
    }