import React, { useEffect, useRef, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useReactMediaRecorder } from "react-media-recorder";
import CodeExplorer from "../components/CodeExplorer/CodeExplorer";
import EditorComponent from "../components/Editor/Editor";
import CodeParticipants from "../components/CodeParticipants/CodeParticipants";
import RoomInfo from "../components/RoomInfo/RoomInfo";
import Terminal from "../components/Terminal/Terminal";
import Chat from "../components/Chat/Chat";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Peer from "peerjs";
import Board from "../components/Board/Board";

const useStyles = makeStyles((theme) => ({
  sideNav: {
    borderRight: "1px solid grey",
    height: "100vh",
  },
  borderClass: {
    border: "1px solid grey",
  },
  heightClass: {
    height: "50vh",
  },
}));

const PeerCodeRoom = ({ socket }) => {
  const classes = useStyles();
  const { roomId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [mode, setMode] = useState(true);
  const [connections, setConnections] = useState([]);

  const finishRecording = (blobUrl) => {
    console.log("blob", blobUrl);
  };
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true, onStop: finishRecording });

  // // -->
  // const ENDPOINT = `${process.env.REACT_APP_SOCKET_SERVER}`;
  // const ENDPOINT = "http://localhost:8080/pty";
  // const socket = useRef();
  const myPeer = useRef();
  useEffect(() => {
    // socket.current = io(ENDPOINT, {
    //   // path: `/1234/`,
    // });
  }, []);
  // -->

  return (
    <>
      {mode === true ? (
        <Grid container spacing={1}>
          <Grid item xs={2} className={classes.sideNav}>
            <CodeExplorer setMode={setMode} />
          </Grid>
          <Grid item xs={6}>
            <EditorComponent
              startRecording={startRecording}
              stopRecording={stopRecording}
              status={status}
              mediaBlobUrl={mediaBlobUrl}
            />
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                className={`${classes.borderClass} ${classes.heightClass}`}
              >
                {/* <CodeParticipants
                connections={connections}
                socket={socket.current}
                myPeer={myPeer}
              /> */}
                {/*Pass Socket*/}
              </Grid>
              <Grid
                item
                xs={6}
                className={`${classes.borderClass} ${classes.heightClass}`}
              >
                <RoomInfo />
              </Grid>
              <Grid item xs={12}>
                {/* <Chat connections={connections} socket={socket.current} /> */}
                {/*Pass Socket*/}
              </Grid>
              <Grid item xs={12}>
                {socket.current && socket.current.connected ? (
                  <Terminal socket={socket} />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Board setMode={setMode} />
      )}
    </>
  );
};

export default PeerCodeRoom;
