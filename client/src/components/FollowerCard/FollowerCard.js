import React from "react";
import {
  Container,
  Paper,
  Grid,
  Box,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import img from "../../assets/code.svg";

const FollowerCard = () => {
  return (
    <Paper
      elevation={5}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "baseline",
        backgroundColor: "#000015",
        color: "white",
        borderRadius: 10,
        marginBottom: 20,
        paddingBottom: 20,
        width: "100%",
      }}
    >
      <Grid
        item
        xs={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={img}
          style={{ height: 70, width: 70, marginRight: 20, top: 40, left: 20 }}
        />
      </Grid>
      <Grid item xs={8}>
        <Container
          disableGutters
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
        >
          <h1>Divanshu Agarwal</h1>
          <p style={{ marginLeft: 10 }}>divanshurox</p>
        </Container>
        <p>React | Redux | React Native | Graphql | JavaScript</p>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary">
          Follow
        </Button>
      </Grid>
    </Paper>
  );
};

export default FollowerCard;
