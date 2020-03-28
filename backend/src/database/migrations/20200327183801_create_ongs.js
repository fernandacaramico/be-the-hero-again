exports.up = function(knex) { // mét up=> o q acontece qdo exec migration
  return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) { //mét down=> o q fazer de der ruim
  return knex.schema.dropTable('ongs')
};
