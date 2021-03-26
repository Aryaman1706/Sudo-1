import { Button, Grid, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import HomeCard from "../components/HomeCard/HomeCard";
import Layout from "../components/Layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import axios from "../utils/axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "70%",
    height: "70%",
    backgroundColor: "#161b22",
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
  input: {
    color: "#fff",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(true);
  const [posts, setPosts] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [actualFile, setActualFile] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  const formData = new FormData();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setActualFile(event.target.files[0]);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const res = await axios.get("/post/explore");
    setPosts(res.data.data);
  };
  const onSubmit = () => {
    formData.append("photo", actualFile);
    formData.append("caption", caption);
    axios
      .post("/post/upload", formData, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts((prev) => {
          return [...prev, res.data.data];
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  const body = (
    <div
      style={{
        top: 100,
        left: 230,
      }}
      className={classes.paper}
    >
      <h2 id="simple-modal-title">Upload an image</h2>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <img
          src={file}
          style={{
            height: 200,
            width: 200,
            borderRadius: 10,
          }}
          alt="upload"
        />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          style={{
            display: "none",
          }}
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file" style={{ marginLeft: 30 }}>
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </div>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Caption"
          variant="outlined"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          multiline
          required
          fullWidth
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
          style={{
            outline: focus && "none",
            borderRadius: 10,
            color: "white",
            border: focus && "1px solid #fff",
          }}
          InputProps={{
            classes: classes.input,
          }}
        />
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Button variant="contained" size="large" onClick={onSubmit}>
          Post
        </Button>
      </div>
    </div>
  );

  return (
    <>
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
              Home
            </h1>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right", margin: "auto" }}>
            <Button variant="contained" size="large" onClick={handleOpen}>
              Add a Post
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6} direction="column">
              {posts?.length > 0 ? (
                posts.map((post) => <HomeCard post={post} />)
              ) : (
                <h2>No posts</h2>
              )}
              {/* <HomeCard /> */}
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Home;
