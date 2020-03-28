exports.up = function(knex) { // mét up=> o q acontece qdo exec migration
  return knex.schema.createTable('incidents', function(table){
    table.increments(); // cria PK com auto increment

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    table.string('ong_id').notNullable(); // cria coluna da chave estrang

    table.foreign('ong_id').references('id').inTable('ongs'); // associa FK
  })
};

exports.down = function(knex) { //mét down=> o q fazer de der ruim
  return knex.schema.dropTable('incidents')
};
