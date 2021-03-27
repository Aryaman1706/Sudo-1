import { Avatar, Divider, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import Layout from "../components/Layout/Layout";
import axios from "../utils/axios";

const useStyles = makeStyles((themes) => ({
  videoBox: {
    display: "flex",
    flexDirection: "column",
  },
  img: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    backgroundColor: "blue",
    width: "45px",
    height: "45px",
    alignSelf: "center",
  },
  title: {
    padding: "0 1rem",
    fontWeight: "600",
    fontSize: "1.2rem",
  },
  subtitle: {
    color: "#aaaaaa",
    fontSize: "0.9rem",
    fontWeight: "400",
  },
  video: {
    width: "100%",
    objectFit: "contain",
    height: "800px",
    marginTop: "2rem",
  },
}));

const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const fetchVideos = async () => {
    const res = await axios.get(`/videos/view/${id}`);
    return res.data;
  };
  const { isLoading, isError, data, error } = useQuery("view", fetchVideos, {
    cacheTime: 0,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) {
    return <Layout>loading...</Layout>;
  }

  const {
    description,
    views,
    title,
    video,
    postedBy: { displayName, avatar_url },
  } = data.data;

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.videoBox}>
          <video src={video} className={classes.video} controls autoPlay />
          <h3>{title}</h3>
          <p className={classes.subtitle}>{views} views</p>
          <Divider style={{ backgroundColor: "#fff" }} />
          <br />
          <div className={classes.flexRow}>
            <Avatar alt={displayName} src={avatar_url} />
            <span style={{ alignSelf: "center", padding: "0 1rem" }}>
              {displayName}
            </span>
          </div>
          <h4>Description</h4>
          <p className={classes.subtitle}>{description}</p>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default View;
