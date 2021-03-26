import React, { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import PeopleIcon from "@material-ui/icons/People";
import { makeStyles } from "@material-ui/core/styles";
import img from "../assets/code.svg";
import ReactMarkdown from "react-markdown";
import Star from "../assets/star.svg";
import Rating from "@material-ui/lab/Rating";
import FollowerCard from "../components/FollowerCard/FollowerCard";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  button: {
    width: 300,
    height: 30,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    height: 500,
  },
  card: {
    height: "100px",
    width: "300px",
    boxShadow: "10",
    boxSizing: "border-box",
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 50,
    backgroundColor: "#000015",
    color: "white",
    "&:hover": {
      transition: "all 0.2s ease-out",
      boxShadow: "0px 10px 12px rgba(38, 38, 38, 0.5)",
      bottom: "-1rem",
      border: "1.4px solid #cccccc",
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const data = [
  {
    language: "Javascript",
    stars: 20,
  },
  {
    language: "Python",
    stars: 40,
  },
  {
    language: "C++",
    stars: 60,
  },
  {
    language: "Ruby",
    stars: 10,
  },
];

const Cards = ({ language, stars }) => {
  const classes = useStyles();
  return (
    <Paper elevation={5} className={classes.card}>
      <Box className={classes.box}>
        <p>{language}</p>
        <Container
          style={{
            marginLeft: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StarIcon color="black" fontSize="10" />
          <p>{stars}</p>
        </Container>
      </Box>
    </Paper>
  );
};

const Profile = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      style={{
        paddingRight: "20px",
        paddingLeft: "20px",
        paddingTop: "20px",
      }}
    >
      <Grid item xs={12} lg={4}>
        <Paper
          elevation={5}
          style={{
            height: "fit-content",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "transparent",
            padding: 20,
          }}
        >
          <img
            src={img}
            alt="img"
            style={{
              height: 170,
              width: 170,
              paddingBottom: 50,
            }}
          />
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <Typography variant="h4">Divanshu Agarwal</Typography>
            <Typography variant="h6">@divanshurox</Typography>
            <Typography>BIO</Typography>
            <Button variant="contained" className={classes.button}>
              Edit Profile
            </Button>
            <Container className={classes.profileContainer}>
              <PeopleIcon size="10" color="black" />
              <p
                onClick={() => history.push("/profile/following")}
                style={{
                  cursor: "pointer",
                }}
              >
                3 Following .{" "}
              </p>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => history.push("/profile/followers")}
              >
                3 Followers
              </p>
            </Container>
            <Container className={classes.profileContainer}>
              <img src={Star} alt="star" />
            </Container>
            <span style={{ fontSize: "3rem" }}>1500</span>
            <Rating value={3} />
          </Container>
        </Paper>
      </Grid>
      <Grid container item xs={12} lg={8} direction="column">
        <Paper
          style={{
            height: "fit-content",
            borderRadius: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",

            padding: "10px 20px",
            color: "white",
          }}
        >
          {[1, 1, 1, 1].map((ele, i) => {
            return <FollowerCard key={i} />;
          })}
        </Paper>
        )
      </Grid>
    </Grid>
  );
};

export default Profile;
