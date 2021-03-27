import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Layout from "../components/Layout/Layout";
import MDEditor from "@uiw/react-md-editor";
import { ControlledEditor } from "@monaco-editor/react";
import axios from "../utils/axios";
import { v4 as uuidV4 } from "uuid";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    "& textarea": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
  },
  select: {
    color: "#fff",
    width: "200px",
    border: "2px solid #3f51b5",
    marginBottom: "1rem",
  },
  label: {
    "& label": {
      color: "white",
    },
  },
}));

const AddQuestion = () => {
  const classes = useStyles();
  const [isCode, setIsCode] = useState(false);
  const [code, setCode] = useState("Write your code here :)");
  const [language, setLanguage] = useState("javascript");
  const [allTags, setAllTags] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    markdown: `test MARKDOWN `,
    tags: [],
  });

  const getAllTags = async () => {
    const { data } = await axios.get("/tag/all");
    setAllTags(data);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const handleEditorChange = (e, value) => {
    setCode(value);
  };

  const handleChange = (e) => {
    setIsCode(e.target.checked);
  };

  const handleSelectChange = (e) => {
    setNewQuestion({ ...newQuestion, tags: e.target.value });
  };

  const postQuestion = async () => {
    console.log(newQuestion);
    const tags = newQuestion.tags.map((t) => t._id);
    console.log(tags);
    if (!isCode) {
      const { data } = await axios.post(
        "/questions/new",
        { ...newQuestion, tags },
        {
          withCredentials: true,
        }
      );
      data.tags = newQuestion.tags;
    } else if (isCode === true) {
      const blob = new Blob([code], { type: "text/plain" });
      console.log(blob, "blob");
      const text = await new Response(blob).text();
      console.log(text);
      console.log(newQuestion, "question data");
      const formData = new FormData();
      formData.append("title", newQuestion.title);
      formData.append("markdown", newQuestion.markdown);
      //   formData.append("tags", JSON.stringify(newQuestion.tags));
      //   const file = new File([blob], `code-${uuidV4()}.txt`);

      formData.append("fileBlob", blob);
      formData.append("language", language);
      //   console.log(file, "file");

      const { data } = await axios.post("/questions/new", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      data.tags = newQuestion.tags;
    }
    setNewQuestion({
      title: "",
      markdown: `test MARKDOWN `,
      tags: [],
    });
  };

  return (
    <Layout>
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
            Ask a Question
          </h1>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Question"
            variant="outlined"
            multiline
            required
            fullWidth
            value={newQuestion.title}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, title: e.target.value })
            }
            className={classes.input}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-mutiple-chip-label" classes={classes.label}>
            Select Tags
          </InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            fullWidth
            variant="outlined"
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
        </Grid>
        <Grid item xs={12}>
          <MDEditor
            value={newQuestion.markdown}
            onChange={(value) => {
              setNewQuestion({ ...newQuestion, markdown: value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCode}
                onChange={handleChange}
                name="checkedF"
              />
            }
            label="Add your Code"
          />
        </Grid>
        <Grid item xs={12}>
          {isCode && (
            <>
              <FormControl variant="filled" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  inputProps={{
                    className: classes.select,
                  }}
                  variant="outlined"
                >
                  <MenuItem value={"javascript"}>javascript</MenuItem>
                  <MenuItem value={"typescript"}>typescript</MenuItem>
                  <MenuItem value={"python"}>python</MenuItem>
                </Select>
              </FormControl>
              <ControlledEditor
                height="80vh"
                value={code}
                onChange={handleEditorChange}
                theme="dark"
                language={language}
              />
            </>
          )}
          <br />
          <Grid item xs={12}>
            <Button onClick={postQuestion} variant="contained" size="large">
              Post the Question
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddQuestion;
