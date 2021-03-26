const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const newQuestion = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    markdown: Joi.string().required(),
    tags: Joi.array().items(Joi.objectId()),
  });
  return schema.validate(body);
};
const newAnswer = (body) => {
  const schema = Joi.object({
    markdown: Joi.string().required(),
    question: Joi.objectId().required(),
  });
  return schema.validate(body);
};
const updateQuestion = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    markdown: Joi.string().required(),
    tags: Joi.array().items(Joi.objectId()),
  });
  return schema.validate(body);
};
const updateAnswer = (body) => {
  const schema = Joi.object({
    markdown: Joi.string().required(),
  });
  return schema.validate(body);
};

const newComment = (body) => {
  const schema = Joi.object({
    questionId: Joi.objectId().required(),
    answerId: Joi.objectId(),
    data: Joi.string().required(),
  });
  return schema.validate(body);
};
module.exports = {
  newQuestion,
  newAnswer,
  updateQuestion,
  updateAnswer,
  newComment,
};
