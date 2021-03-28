import React, { useState } from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import Layout from "../components/Layout/Layout";
import { useHistory } from "react-router";
import Axios from "axios";
import { v4 as uuidV4 } from "uuid";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
    width: "100%",
  },
  input: {
    "& input": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
  },
}));

const CreateRoom = () => {
  const classes = useStyles();
  const history = useHistory();
  const [join, setJoin] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  let roomID;

  const createRoomReq = async () => {
    roomID = uuidV4();
    try {
      const res = await Axios.get(
        `http://localhost:8000/create/${roomID}/?new=true`
      );
      setLoading(true);
      if (res.status === 200) {
        history.push(`/coderoom/${roomID}`);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinRoomReq = async () => {
    roomID = join;
    const res = await Axios.get(
      `http://localhost:8000/create/${roomID}/?new=false`
    );
    setLoading2(true);
    if (res.status === 200) {
      history.push(`/coderoom/${roomID}`);
      setLoading2(false);
    }
  };

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
            Peer Coding
          </h1>
        </Grid>
        <Grid item xs={6} style={{ margin: "auto", textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              createRoomReq();
            }}
          >
            {!loading ? "Create Room" : "Creating"}
          </Button>
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            label="Paste a room code here"
            className={classes.input}
            fullWidth
            value={join}
            onChange={(e) => {
              setJoin(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2} style={{ alignSelf: "stretch" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ height: "100%" }}
            onClick={() => {
              joinRoomReq();
            }}
          >
            {!loading2 ? "Join Room" : "Joining"}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateRoom;
