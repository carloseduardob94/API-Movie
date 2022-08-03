const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const userControllers = new UsersController()

usersRoutes.post("/", userControllers.create)
usersRoutes.put("/:id", userControllers.update)

module.exports = usersRoutes