const express = require("express");
const TopicRoutes = express.Router()

const {
    getAllTopics,
    createTopic,
    getSpecificTopic
} = require("./../Controllers/TopicController")

TopicRoutes.get("/",getAllTopics)
TopicRoutes.get("/:id",getSpecificTopic)
TopicRoutes.post("/",createTopic)

module.exports = TopicRoutes