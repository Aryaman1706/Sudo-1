import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import ForumExploreCard from "../components/ForumExploreCard/ForumExploreCard";
import Layout from "../components/Layout/Layout";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import axios from "../utils/axios";

const Articles = () => {
  const [posts, setPosts] = useState(null);

  const fetchPost = async () => {
    const res = await axios.get(
      "https://hn.algolia.com/api/v1/search?tags=front_page"
    );
    setPosts(res.data.hits);
  };
  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 800,
              background: "-webkit-linear-gradient(-70deg,#a2facf,#64acff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Articles
          </h1>
        </Grid>
        <Grid item xs={12}>
          {!posts && <h4>Loading...</h4>}
          {posts?.map((item) => (
            <ArticleCard item={item} />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Articles;
