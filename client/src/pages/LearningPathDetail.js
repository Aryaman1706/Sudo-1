import { Grid } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout/Layout";

const LearningPathDetail = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Web Development</h1>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              borderRadius: 10,
              border: "1px solid #30363d",
              padding: "1rem",
            }}
          >
            <ReactMarkdown>
              ### Table of Contents - [How to begin](#how-to-begin) - [Frontend
              Guide](#frontend-guide) - [What is HTML](#what-is-HTML) - [What is
              CSS](#what-is-CSS) - [What is JavaScript](#what-is-JavaScript) -
              [What is Bootstrap](#what-is-Bootstrap) - [What is
              React.js](#what-is-react) - [What is Redux](#what-is-redux) -
              [Best Frontend Course Roadmap for beginners(ACM
              Suggestion)](#best-frontend-course-roadmap-for-beginners(acm-suggestion))
              - [Sites for Reference](#sites-for-reference) - [Backend
              Guide](#frontend-guide) - [What is Node.js](#what-is-node.js) -
              [Best Node.js Course for beginners (ACM
              Suggestion)](#best-Node.js-Course-for-beginners-(acm-suggestion))
              - [Best MERN Stack projects](#best-mern-stack-projects) - [Youtube
              Channels to Subscribe](#youtube-channels-and-playlists) - [Some
              Websites to solve doubts](#some-websites-to-solve-doubts) - [The
              Journey has Just Begun](#the-journey-has-just-begun)
            </ReactMarkdown>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default LearningPathDetail;
