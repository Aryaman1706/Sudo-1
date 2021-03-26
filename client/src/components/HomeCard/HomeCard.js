import {
  Avatar,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import Linkify from "react-linkify";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "transparent",
    color: "white",
    padding: "1rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    margin: "auto 0 auto 0",
    paddingLeft: "5px",
    fontWeight: "500",
  },
}));

const HomeCard = ({ post }) => {
  const classes = useStyles();
  const [upvoted, setUpvoted] = useState(false);
  const likePost = () => {
    axios
      .post(`/post/like/${post._id}`, {})
      .then((res) => {
        console.log(res.data);
        post.totalUpvotes = post.totalUpvotes + 1;
        setUpvoted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid item xs={6}>
      <Paper elevation={4} className={classes.card}>
        <div className={classes.flexColumn}>
          <div className={classes.flexRow}>
            <Avatar src={post?.postedBy.avatar_url} alt="" />
            <span className={classes.text}>{post?.postedBy.displayName}</span>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <Linkify>{post?.caption}</Linkify>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <img
              src={post?.photo}
              alt=""
              style={{ width: "100%", objectFit: "contain", borderRadius: 10 }}
            />
          </div>
          <div className={classes.flexRow}>
            <span>
              <ArrowUpwardIcon />
            </span>
            <span style={{ margin: "auto 0 auto 0" }}>{post.totalUpvotes}</span>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <Divider style={{ backgroundColor: "#fff" }} />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            {!upvoted ? (
              <Button
                startIcon={<ArrowUpwardIcon />}
                style={{ color: "white" }}
                onClick={likePost}
              >
                Upvote
              </Button>
            ) : (
              <Button
                startIcon={<ArrowUpwardIcon />}
                style={{ color: "white" }}
              >
                Upvoted
              </Button>
            )}
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default HomeCard;
