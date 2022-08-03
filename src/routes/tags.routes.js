const { Router } = require('express')

const TagsController = require('../controllers/TagsController')

const tagsRoutes = Router()

const tagsControllers = new TagsController()

tagsRoutes.get("/:user_id", tagsControllers.index)


module.exports = tagsRoutes