import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";
import axios from "../utils/axios";

import QuestionBody from "../components/Forum/QuestionBody";
import AnswerBody from "../components/Forum/AnswerBody";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  heading: {
    fontSize: "30px",
  },
}));

const mkdStr = `# Your answer here!

**Hello world!!!**


`;

const Forum = () => {
  const classes = useStyles();
  const [yourAnswer, setYourAnswer] = useState(mkdStr);
  let { id } = useParams();
  const [question, setQuestion] = useState({});

  const getCurrentQuestion = async () => {
    const { data } = await axios.get(`/questions/${id}`);
    // console.log(data);
    setQuestion(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCurrentQuestion();
  }, []);
  const postAnswer = async () => {
    const { data } = await axios.post(
      "/questions/answer/new",
      {
        markdown: yourAnswer,
        question: question._id,
      },
      {
        withCredentials: true,
      }
    );
    const answers = [...question.answers];
    answers.push(data);
    setQuestion({ ...question, answers });
  };

  if (!question._id) return null;
  return (
    <>
      <Layout>
        <Grid item xs={12} className={classes.root}>
          <QuestionBody
            question={question}
            setQuestion={setQuestion}
            classes={classes}
          />
          <p
            style={{
              paddingLeft: "20px",
              fontSize: "1.6rem",
            }}
          >
            {`${question.answers.length} Answers`}
          </p>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            {question.answers.map((answer) => (
              <AnswerBody
                answer={answer}
                question={question}
                setQuestion={setQuestion}
              />
            ))}
            <Grid item xs={12}>
              <p style={{ fontSize: "1.6rem" }}>Your Answer</p>
              <MDEditor value={yourAnswer} onChange={setYourAnswer} />
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "30px",
                }}
                onClick={postAnswer}
              >
                Post Your Answer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Forum;
