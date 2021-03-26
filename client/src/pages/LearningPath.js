import { Grid } from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout/Layout";
import LearningCard from "../components/LearningCard/LearningCard";

const LearningPath = () => {
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
            Learning Paths
          </h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <LearningCard topic={"Web Development"} />
            <LearningCard topic={"Machine Learning"} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default LearningPath;
