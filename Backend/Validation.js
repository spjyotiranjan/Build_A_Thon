const Joi = require("joi");

const UserValidationSchema = Joi.object({
  Name: Joi.string().min(3).max(20).required(),
  Username: Joi.string().min(4).max(20).required(),
  Email: Joi.string().email().required(),
  Points: Joi.number().min(0).required()
});

let SubTopic = Joi.object().keys({
    SubTopicName: Joi.string().required(),
    SubTopicContent: Joi.string().required(),
  })

const DataValidationSchema = Joi.object({
    TopicName: Joi.string().required(),
    TopicDescription: Joi.string().required(),
  SubTopics: Joi.array().items(SubTopic),
  LearnedBy: Joi.string().required()
});

module.exports = { UserValidationSchema, DataValidationSchema };
