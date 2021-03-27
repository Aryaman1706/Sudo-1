import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import HistoryIcon from "@material-ui/icons/History";
import ReactMarkdown from "react-markdown";
import axios from "../../utils/axios";

import { Comment, InfoCard, PostComment } from "./FormCommon";
const QuestionBody = ({ question, setQuestion, classes }) => {
  const postCommentToQuestion = async (commentData) => {
    const { data } = await axios.post(`/questions/comment/new`, {
      questionId: question._id,
      data: commentData,
    });
    const comments = [...question.comments];
    comments.push(data);

    setQuestion({ ...question, comments });
  };
  const upvoteQuestion = async () => {
    try {
      const { data } = await axios.get(`/questions/upvote/${question.id}`, {
        withCredentials: true,
      });

      const tempQuestion = { ...question };
      tempQuestion.votes = data.votes;
      setQuestion({ ...tempQuestion });
    } catch (err) {
      console.error("while downvoting", err);
    }
  };
  const downvoteQuestion = async () => {
    try {
      const { data } = await axios.get(`/questions/downvote/${question.id}`);
      // console.log(data);
      const tempQuestion = { ...question };
      tempQuestion.votes = data.votes;
      setQuestion({ ...tempQuestion });
    } catch (err) {
      console.error("while downvoting", err);
    }
  };
  return (
    <>
      <Typography variant="h4" gutterBottom className={classes.heading}>
        {question.title}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <p style={{ marginRight: "10px" }}>Asked today</p>
        <p style={{ marginRight: "10px" }}>Active Today</p>
        <p>Asked 15 times</p>
      </div>
      <Divider
        style={{
          backgroundColor: "#fff",
        }}
      />
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        <Grid
          item
          xs={1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ArrowUpwardIcon onClick={upvoteQuestion} size={15} color="#ccc" />
          <p>{question.votes}</p>
          <ArrowDownwardIcon
            onClick={downvoteQuestion}
            size={15}
            color="#ccc"
          />
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
              <ReactMarkdown>{question.markdown}</ReactMarkdown>
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
              marginTop: "50px",
              marginBottom: "3rem",
            }}
          >
            <InfoCard
              info={{ user: question.user, asked: question.createdAt }}
            />
          </Grid>

          {question.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
          <PostComment postComment={postCommentToQuestion} />
        </Grid>
      </Grid>
      <Divider
        style={{
          backgroundColor: "#fff",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      />
    </>
  );
};

export default QuestionBody;
