const { DataValidationSchema } = require("./../Validation");
const TopicsModel = require("./../Models/TopicsSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllTopics = async (req, res) => {
  try {
    const Topics = await TopicsModel.find({});
    if (Topics.length === 0) {
      res.status(404).json({ message: "Database is Empty" });
    } else {
      res.status(200).json(Topics);
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Fetch Data" });
  }
};

const createTopic = async (req, res) => {
  try {
    const { error, value } = DataValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({ error: error.details.map((e) => e.message) });
    } else {
      const { Name, Email, Username } = value;
      const Topic = await TopicsModel.create({
        TopicName,
        TopicDescription,
        SubTopics,
        LearnedBy,
      });
      const resData = {
        Name,
        Email,
        Rank,
        Username: jwt.sign(Username, process.env.SECRET),
      };
      res.status(201).json({
        message: "User Created",
        User: resData,
      });
    }
  } catch (error) {
    if (error.keyPattern && error.keyValue) {
      errorName = Object.keys(error.keyPattern);
      errorValue = error.keyValue[errorName];
      res.status(400).json({
        message: "Unable to Create User",
        errorMessage: `"${errorValue}" ${errorName[0]} is already taken`,
      });
    } else {
      res.status(500).json({ message: "Unable to create User" });
    }
  }
};

const getSpecificTopic = async (req,res) => {
    try {
        const Topics = await Topics.find({
            LearnedBy: req.params.id,
          }).exec()
        if(Topics.length == 0){
            res.status(404).json({ message: "No Topics found that has been learned by the user." });
        }else{
            res.status(200).json({Topics})
        }
    } catch (error) {
        res.status(500).json({message: "Unable to Fetch Data."})
    }
}

module.exports = {
    getAllTopics,
    createTopic,
    getSpecificTopic
}