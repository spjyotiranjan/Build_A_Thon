const Joi = require("joi");

const UserValidationSchema = Joi.object({
  Name: Joi.string().min(3).max(20).required(),
  Username: Joi.string().min(4).max(20).required(),
  Email: Joi.string().email().required(),
});

let SubTopic = Joi.object().keys({
    SubTopicName: Joi.string().min(3).max(20).required(),
    SubTopicContent: Joi.string().required(),
  })

const DataValidationSchema = Joi.object({
    TopicName: Joi.string().min(3).max(20).required(),
    TopicDescription: Joi.string().min(5).max(3000).required(),
  SubTopics: Joi.array().items(SubTopic),
  LearnedBy: Joi.string().required()
});

module.exports = { UserValidationSchema, DataValidationSchema };
