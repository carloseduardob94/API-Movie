
exports.up = knex => knex.schema.createTable("Movie_Tags", table =>{
  table.increments("id")
  table.text("name")
  table.integer("note_id").references("id").inTable("Movie_Notes").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")

}) 
  

exports.down = knex => knex.schema.dropTable("Movie_Tags")
