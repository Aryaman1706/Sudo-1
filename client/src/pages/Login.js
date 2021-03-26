import { Button, Grid } from "@material-ui/core";
import React from "react";
import LoginImg from "../assets/login.svg";
import GitHubIcon from "@material-ui/icons/GitHub";
const Login = () => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        justify="center"
        style={{
          display: "grid",
          placeItems: "center",
          height: "calc(100vh - 70px)",
        }}
      >
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
            Sudo: The Dev Network
          </h1>
        </Grid>
        <Grid item xs={12}>
          <img
            src={LoginImg}
            alt="img"
            style={{ height: "300px", objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            color="primary"
            size="large"
            href={`${process.env.REACT_APP_REDIRECT_URI}`}
          >
            Login with Github
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
