import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Chip,
} from "@material-ui/core";

import ForumExploreCard from "../components/ForumExploreCard/ForumExploreCard";
import Layout from "../components/Layout/Layout";
import axios from "../utils/axios";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50%",
    height: "40%",
    backgroundColor: "#161b22",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
  },
  input: {
    color: "white",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(true);
  const [questions, setQuestions] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    markdown: `test MARKDOWN `,
    tags: [],
  });
  const getQuestions = async () => {
    //! infinte scroll?
    const { data } = await axios.get("/questions/all");
    // console.log(data);
    setQuestions(data);
  };
  const getAllTags = async () => {
    const { data } = await axios.get("/tag/all");
    setAllTags(data);
  };
  useEffect(() => {
    getQuestions();
    getAllTags();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postQuestion = async () => {
    console.log(newQuestion);
    const tags = newQuestion.tags.map((t) => t._id);
    console.log(tags);
    const { data } = await axios.post(
      "/questions/new",
      { ...newQuestion, tags },
      {
        withCredentials: true,
      }
    );
    data.tags = newQuestion.tags;
    setQuestions([...questions, data]);
    setNewQuestion({
      title: "",
      markdown: `test MARKDOWN `,
      tags: [],
    });
    handleClose();
  };
  const handleSelectChange = (e) => {
    setNewQuestion({ ...newQuestion, tags: e.target.value });
  };
  const body = (
    <div
      style={{
        top: 200,
        left: 300,
      }}
      className={classes.paper}
    >
      <h2 id="simple-modal-title">Enter the question</h2>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Question"
          variant="outlined"
          multiline
          required
          fullWidth
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
          style={{
            border: focus && "1px solid #fff",
            borderRadius: 10,
            color: "white",
          }}
          value={newQuestion.title}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, title: e.target.value })
          }
          InputProps={{
            classes: classes.input,
          }}
        />
        <InputLabel id="demo-mutiple-chip-label">Select Tags</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={newQuestion.tags}
          onChange={handleSelectChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value._id}
                  label={value.name}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        >
          {allTags.map((tag) => (
            <MenuItem key={tag._id} value={tag}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Button onClick={postQuestion} variant="contained" size="large">
          Post the Question
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 800,
              background: "-webkit-linear-gradient(-70deg,#a2facf,#64acff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Forums
          </h1>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right", margin: "auto" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              history.push("/forums/add-question");
            }}
          >
            Ask a Question
          </Button>
        </Grid>
        <Grid item xs={12}>
          {questions.map((question) => (
            <ForumExploreCard key={question._id} question={question} />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}
