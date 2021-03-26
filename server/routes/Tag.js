const express = require("express");
const router = express.Router();
const Joi = require("joi");

// * Models
const Tag = require("../models/Tag");

// * Middelware
const admin = require("../Middleware/admin");

// * get all tags
router.get("/all", async (req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

// * add new tag
router.post("/new", admin, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { value, error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, error: "Invalid name" });
  const newTag = new Tag({
    name: value.name,
  });
  await newTag.save();
  res.send(newTag);
});

// * update a tag
router.post("/new/:id", admin, async (req, res) => {
  const id = req.params;
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { value, error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, error: "Invalid name" });
  const tag = await Tag.findByIdAndUpdate(
    id,
    { name: value.name },
    { new: true }
  );
  if (!tag) return res.status(400).send({ error: "No tag found" });
  res.send(tag);
});

// * delete a tag
router.post("/new/:id", admin, async (req, res) => {
  const id = req.params;
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) return res.status(400).send({ error: "No tag found" });
  res.send(tag);
});

module.exports = router;
