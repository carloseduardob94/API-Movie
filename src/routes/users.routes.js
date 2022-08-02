const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

function myMiddleware(request, response, next){

}





const userControllers = new UsersController()

usersRoutes.post("/", myMiddleware, userControllers.create)

module.exports = usersRoutes