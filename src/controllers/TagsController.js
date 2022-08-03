const knex = require('../database/knex');

class TagsController{
  async index(request, response){
    const {user_id} = request.params

    const tags = await knex("Movie_Tags")
    .where({user_id})

    return response.json(tags)
  }
}

module.exports = TagsController;