const { Router } = require('express')

const NotesController = require('../controllers/NotesController')

const notesRoutes = Router()

const notesControllers = new NotesController()

notesRoutes.post("/:user_id", notesControllers.create)
notesRoutes.get("/:id", notesControllers.show)
notesRoutes.delete("/:id", notesControllers.delete)

module.exports = notesRoutes