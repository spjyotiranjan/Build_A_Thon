const express = require("express");
const UserRoutes = express.Router()

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require("./../Controllers/UserController")

UserRoutes.get("/",getAllUsers)
UserRoutes.get("/:id",getOneUser)
UserRoutes.post("/",createUser)
UserRoutes.patch("/:id",updateUser)
UserRoutes.delete("/:id",deleteUser)


module.exports = UserRoutes