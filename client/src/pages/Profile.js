import React, { useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions";

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
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loginUser());
  }, []);
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
            src={auth.user?.avatar_url}
            alt={auth.user?.displayName}
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
            <Typography variant="h4">{auth.user?.displayName}</Typography>
            <Typography variant="h6">@{auth.user?.username}</Typography>
            <Typography>{auth.user?.bio}</Typography>
            {/* <Button variant="contained" className={classes.button}>
              Edit Profile
            </Button> */}
            <Container className={classes.profileContainer}>
              <PeopleIcon size="10" color="black" />
              <p
                onClick={() => history.push("/profile/following")}
                style={{
                  cursor: "pointer",
                }}
              >
                {auth.user?.following.length} Following .{" "}
              </p>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => history.push("/profile/followers")}
              >
                {auth.user?.followers.length} Followers
              </p>
            </Container>
            <Container className={classes.profileContainer}>
              <img src={Star} alt="star" />
            </Container>
            <span style={{ fontSize: "3rem" }}>{auth.user?.points}</span>
            <Rating value={auth.user?.stars} />
          </Container>
        </Paper>
      </Grid>
      <Grid container item xs={12} lg={8} direction="column">
        <Paper
          elevation={5}
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
          <h1>README.md</h1>
          <ReactMarkdown>
            ### Hi there 👋 My name is [Aniket
            Biswas](https://www.linkedin.com/in/aniket-biswas-59394b191/). I'm a
            Full Stack Web Developer and exploring various other technologies
            everyday. I am currently pursuing B.E. 💻 at [Thapar Institute of
            Engineering and Technology](https://thapar.edu)
            ![](https://komarev.com/ghpvc/?username=aniketbiswas21) Here's more
            about me - 🔭 I’m currently working on -
            [Pix](https://github.com/aniketbiswas21/Pix), [Buying Selling
            Platform](https://github.com/developer-student-club-thapar/buying_selling_devops)
            and [Thapar
            App](https://github.com/developer-student-club-thapar/thapar_app) -
            🌱 I’m currently learning - ReactJS, NodeJS, GraphQL, Firebase,
            Typescript and Flutter. - 👯 I’m looking to collaborate on - MERN
            stack projects - 💬 Ask me about - Anything related to web
            technologies. :smiley: - 📫 How to reach me -
            aniket.biswas75@gmail.com - 😄 Pronouns - He/Him - ⚡ Fun fact - .
            The best way to learn programming you ask? Google it
            :stuck_out_tongue_closed_eyes:
          </ReactMarkdown>
        </Paper>
        <Paper
          elevation={5}
          style={{
            height: "fit-content",
            borderRadius: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 10px",
            color: "white",
            marginTop: 40,
          }}
        >
          <h1 style={{ paddingLeft: "50px" }}>Popular Answers</h1>
          <Container
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {data.map((ele, i) => {
              return (
                <Cards key={i} language={ele.language} stars={ele.stars} />
              );
            })}
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
