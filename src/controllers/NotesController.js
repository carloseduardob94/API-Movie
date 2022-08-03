const knex = require('../database/knex');

class NotesController{
  async create(request, response){
    const { title, description, rating, Movie_Tags } = request.body
    const {user_id} = request.params

    const note_id = await knex("Movie_Notes").insert({
      title, 
      description, 
      rating, 
      user_id
    })
    

    const tagsInsert = Movie_Tags.map(name =>{
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("Movie_Tags").insert(tagsInsert)

    response.json()

  }

  async show(request, response){
    const {id} = request.params

    const note = await knex("Movie_Notes").where({id}).first()
    const tags = await knex("Movie_Tags").where({note_id: id}).orderBy("name")

    return response.json({
      ...note,
      tags
    })
  }

  async delete(request, response){
    const {id} = request.params

    await knex("Movie_Notes").where({id}).delete()

    return response.json()
  }
}

module.exports = NotesController;