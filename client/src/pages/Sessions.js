import { Grid } from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout/Layout";
import VideoItem from "../components/VIdeoItem/VideoItem";
import { useQuery } from "react-query";
import axios from "../utils/axios";

const Sessions = () => {
  const fetchSessions = async () => {
    const res = await axios.get("/videos/explore");
    return res.data;
  };
  const { isLoading, isError, data, error } = useQuery(
    "all-sessions",
    fetchSessions,
    {
      cacheTime: 0,
    }
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) {
    return <Layout>loading...</Layout>;
  }
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
            Sessions
          </h1>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {data?.data.map((item, index) => (
          <VideoItem item={item} key={index} />
        ))}
      </Grid>
    </Layout>
  );
};

export default Sessions;
