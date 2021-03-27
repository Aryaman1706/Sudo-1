import React from "react";
import { Grid } from "@material-ui/core";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import HistoryIcon from "@material-ui/icons/History";

import ReactMarkdown from "react-markdown";
import axios from "../../utils/axios";

import { Comment, InfoCard, PostComment } from "./FormCommon";

const AnswerBody = ({ question, setQuestion, answer }) => {
  const postCommentToAnswer = async (commentData) => {
    const { data } = await axios.post(
      `/questions/comment/new`,
      { questionId: question._id, answerId: answer._id, data: commentData },
      { withCredentials: true }
    );
    const tempQuestion = { ...question };
    const i = tempQuestion.answers.findIndex((a) => a._id === answer._id);
    tempQuestion.answers[i].comments.push(data);
    setQuestion(tempQuestion);
  };
  const upvoteAnswer = async () => {
    try {
      const { data } = await axios.get(
        `/questions/answer/upvote/${question.id}/${answer._id}`
      );
      const tempQuestion = { ...question };
      const i = tempQuestion.answers.findIndex(
        (answer) => answer._id === data._id
      );
      tempQuestion.answers[i] = data;
      // console.log(data);
      setQuestion({ ...tempQuestion });
    } catch (err) {
      console.error("while upvoting", err);
    }
  };
  const downvoteAnswer = async () => {
    try {
      const { data } = await axios.get(
        `/questions/answer/downvote/${question.id}/${answer._id}`
      );
      // console.log(data);

      const tempQuestion = { ...question };
      const i = tempQuestion.answers.findIndex(
        (answer) => answer._id === data._id
      );
      tempQuestion.answers[i] = data;
      setQuestion({ ...tempQuestion });
    } catch (err) {
      console.error("while downvoting", err);
    }
  };
  return (
    <>
      <Grid
        item
        xs={1}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ArrowUpwardIcon onClick={upvoteAnswer} size={15} color="#ccc" />
        <p>{answer.votes}</p>
        <ArrowDownwardIcon onClick={downvoteAnswer} size={15} color="#ccc" />
        <BookmarksIcon size={15} color="#ccc" />
        <p style={{ color: "#ccc" }}>1</p>
        <HistoryIcon size={15} color="#ccc" />
      </Grid>
      <Grid container item xs={11}>
        <Grid item xs={12}>
          <div
            style={{
              borderRadius: 10,
              border: "1px solid #30363d",
              padding: "1rem",
            }}
          >
            <ReactMarkdown>{answer.markdown}</ReactMarkdown>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            marginBottom: "3rem",
            marginTop: "50px",
          }}
        >
          <InfoCard info={{ user: answer.user, asked: answer.createdAt }} />
        </Grid>
        {answer.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
        <PostComment postComment={postCommentToAnswer} />
      </Grid>
    </>
  );
};
export default AnswerBody;
