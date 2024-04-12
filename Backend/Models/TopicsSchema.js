const mongoose = require('mongoose')

const TopicsSchema = mongoose.Schema({
    TopicName: {type: String,required: [true, "Please Add TopicName"]},
    TopicDescription: {type: String,required: [true, "Please Add Description about the topic"]},
    SubTopics: [{
        SubTopicName: {type: String, required: [true, "Please Add Subtopic Name"]},
        SubTopicContent: {type: String, required: [true, "Please Add Content for the given Subtopic"]},
    }],
    LearnedBy: {type: String, required: [true, "Please Add the Name of User"]}
})

const TopicsModel = mongoose.model("topicdatas", TopicsSchema)

module.exports = TopicsModel