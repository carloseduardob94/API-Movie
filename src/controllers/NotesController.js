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

  async index(request, response){
    const {title, user_id, tags} = request.query

    let notes

    if(tags){
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex("Movie_Tags")
      .select([
        "Movie_Notes.id",
        "Movie_Notes.title",
        "Movie_Notes.user_id"
      ])
      .where("Movie_Notes.user_id", user_id)
      .whereLike("Movie_Notes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("Movie_Notes", "Movie_Notes.id", "Movie_Tags.note_id")
      .orderBy("Movie_Notes.title")
    }else{
      notes = await knex("Movie_Notes")
      .where({user_id})
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

    const userTags = await knex("Movie_Tags").where({user_id})
    const noteWithTags = notes.map(note =>{
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
      return {
        ...note,
        tags: noteTags
      }
    })


    return response.json(noteWithTags)
  }
}

module.exports = NotesController;