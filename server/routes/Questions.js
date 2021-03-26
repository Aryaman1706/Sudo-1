const express = require("express");
const isAuthenticated = require("../Middleware/isAuthenticated");
const router = express.Router();

// * Models
const Question = require("../models/Question");

// * Validators
const questionValidator = require("../utils/Validators/Question");

// * search questions
// router.post("/search", async (req, res) => {
//   const value = { searchString: req.body.searchString };
//   const questions = await Question.find({
//     $text: { $search: value.searchString },
//   });
//   res.send(questions);
// });

// * get all questions of a user
router.get("/user", isAuthenticated, async (req, res) => {
  const question = await Question.find({ user: req.user._id });
  res.send(question);
});

// * get all questions
router.get("/all", async (req, res) => {
  const questions = await Question.find().populate("tags").populate("user");
  res.send(questions);
});

// * get all questions sorted by highest upvoted
router.get("/all/upvoted", async (req, res) => {
  const questions = await Question.find().populate("tags").populate("user");
  questions.sort((a, b) => a.upVotes.count > b.upVotes.count);
  res.send(questions);
});

// * get a question
router.get("/:id", async (req, res) => {
  const { id: questionId } = req.params;
  const question = await Question.findById(questionId)
    .populate("tags")
    .populate("user")
    .populate("comments")
    .populate("answers.user");
  console.log(question);
  if (!question) return res.status(400).send({ error: "Invalid question id" });
  res.send(question);
});

// * post new question
router.post("/new", isAuthenticated, async (req, res) => {
  const { value, error } = questionValidator.newQuestion(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, error: "Invalid question" });
  const question = new Question({
    user: req.user._id,
    title: value.title,
    markdown: value.markdown,
    tags: value.tags,
  });
  await question.save();
  res.send(question);
});

// * update question
router.put("/update/:id", isAuthenticated, async (req, res) => {
  const { id: questionId } = req.params;
  const { value, error } = questionValidator.updateQuestion(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      error: "Invalid update to question",
    });
  const question = await Question.findById(questionId);
  if (!question) return res.status(400).send({ error: "Invalid question id" });
  if (question.user.toString().trim() !== req.user._id.toString().trim())
    return res
      .status(403)
      .send({ error: "permission denied: Cant edit this question" });
  Object.keys(value).forEach((v) => {
    question[v] = value[v];
  });
  await question.save();
  res.send(question);
});

// * post new answer
router.post("/answer/new", isAuthenticated, async (req, res) => {
  const { value, error } = questionValidator.newAnswer(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: error.details[0].message, message: "Invalid answer" });

  const question = await Question.findById(value.question);
  const newAnswer = question.answers.create({
    user: req.user._id,
    markdown: value.markdown,
  });
  question.answers.push(newAnswer);
  await question.save();
  newAnswer.user = req.user;
  res.send(newAnswer);
});

//* update answer
router.put(
  "/answer/update/:questionId/:answerId",
  isAuthenticated,
  async (req, res) => {
    const { questionId, answerId } = req.params;
    const { value, error } = questionValidator.updateAnswer(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
        error: "Invalid update to answer",
      });
    const question = await Question.findById(questionId);
    if (!question)
      return res.status(400).send({ error: "Invalid question id" });
    const answer = question.answers.id(answerId);
    if (!answer) return res.status(400).send({ error: "Invalid answer id" });
    if (answer.user.toString().trim() !== req.user._id.toString().trim())
      return res
        .status(403)
        .send({ error: "permission denied: Cant edit this answer" });
    answer.data = value.data;
    await question.save();
    res.send(question);
  }
);

// * post new comment
router.post("/comment/new", isAuthenticated, async (req, res) => {
  const { value, error } = questionValidator.newComment(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: error.details[0].message, message: "Invalid comment" });
  const question = await Question.findById(value.questionId);
  const newComment = question.comments.create({
    user: req.user._id,
    data: value.data,
  });

  if (value.answerId) {
    const answer = question.answers.id(value.answerId);
    answer.comments.push(newComment);
  } else question.comments.push(newComment);

  await question.save();
  res.send(newComment);
});
// * upvote question
router.get("/upvote/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question) return res.status(400).send({ errro: "NO question found" });
  const i = question.voted.users.findIndex(
    (ele) => ele.user._id.toString().trim() === req.user._id.toString().trim()
  );
  const voted = question.voted.users[i];
  if (voted)
    if (voted.upVoted) {
      question.voted.users.splice(i, 1);
      // return res.status(400).send({ error: "question already upvoted" });
      // delete voted;
      question.votes--;
    } else {
      voted.upVoted = true;
      question.votes += 2;
      // question.downVotes--;
    }
  else {
    question.voted.users.push({ user: req.user._id, upVoted: true });
    question.votes++;
  }
  console.log(question.voted.users);
  await question.save();
  res.send(question);
});
// * downvote question
router.get("/downvote/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question) return res.status(400).send({ errro: "NO question found" });
  const i = question.voted.users.findIndex(
    (ele) => ele.user._id.toString().trim() === req.user._id.toString().trim()
  );

  const voted = question.voted.users[i];
  if (voted)
    if (!voted.upVoted) {
      question.voted.users.splice(i, 1);
      question.votes++;
    } else {
      voted.upVoted = false;
      question.votes -= 2;
    }
  else {
    question.voted.users.push({ user: req.user._id, upVoted: false });
    question.votes--;
  }
  await question.save();
  res.send(question);
});

// * upvote answer
router.get(
  "/answer/upvote/:questionId/:answerId",
  isAuthenticated,
  async (req, res) => {
    const { questionId, answerId } = req.params;
    const question = await Question.findById(questionId);
    if (!question) return res.status(400).send({ errro: "NO question found" });
    const answer = await question.answers.id(answerId);
    if (!answer) return res.status(400).send({ errro: "NO answer found" });
    const i = answer.voted.users.findIndex(
      (ele) => ele.user._id.toString().trim() === req.user._id.toString().trim()
    );
    const voted = answer.voted.users[i];
    if (voted)
      if (voted.upVoted) {
        answer.voted.users.splice(i, 1);
        answer.votes--;
        // return res.status(400).send({ error: "answer already upvoted" });
      } else {
        voted.upVoted = true;
        answer.votes += 2;
      }
    else {
      answer.voted.users.push({ user: req.user._id, upVoted: true });
      answer.votes++;
    }
    await question.save();
    answer.user = req.user;
    res.send(answer);
  }
);
// * downvote answer
router.get(
  "/answer/downvote/:questionId/:answerId",
  isAuthenticated,
  async (req, res) => {
    const { questionId, answerId } = req.params;
    const question = await Question.findById(questionId);
    if (!question) return res.status(400).send({ errro: "NO question found" });
    const answer = await question.answers.id(answerId);
    if (!answer) return res.status(400).send({ errro: "NO answer found" });
    const i = answer.voted.users.findIndex(
      (ele) => ele.user._id.toString().trim() === req.user._id.toString().trim()
    );
    const voted = answer.voted.users[i];
    if (voted)
      if (!voted.upVoted) {
        answer.voted.users.splice(i, 1);
        answer.votes++;
      } else {
        voted.upVoted = false;
        answer.votes -= 2;
      }
    else {
      answer.voted.users.push({ user: req.user._id, upVoted: false });
      answer.votes--;
    }
    await question.save();
    answer.user = req.user;
    res.send(answer);
  }
);

module.exports = router;
