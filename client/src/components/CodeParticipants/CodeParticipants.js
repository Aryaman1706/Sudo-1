import React, { Fragment, useState, useEffect } from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  participantsText: {
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0 0 0",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem 0 0 0",
  },
  voiceText: {
    fontSize: "0.8rem",
    color: "rgb(88, 228, 17)",
  },
  userText: {
    margin: "auto 0 auto 0",
    fontWeight: "bold",
    paddingLeft: "8px",
  },
}));

const CodeParticipants = ({ connections, socket, myPeer }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const [micOn, setMicOn] = useState(false);

  const [myStream, setMyStream] = useState(null);
  const [peerStreams, setPeerStreams] = useState({});

  useEffect(() => {
    // Get user media stream
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then((mediaStream) => {
        setMyStream(mediaStream);
      });

    // Socket listeners
    socket.on("callStartClient", (userId) => {
      connectAudio(userId);
    });

    socket.on("callEndClient", (userId) => {
      disconnectAudio(userId);
    });

    // Peer listener
    myPeer.on("call", (call) => {
      call.answer(myStream);
      call.on("stream", (userStream) => {
        setPeerStreams((prev) => {
          return {
            ...prev,
            [call.peer]: userStream,
          };
        });
      });
    });
  }, []);

  const clickHandler = (connection) => {
    if (connection._id.toString().trim() === user._id.toString().trim()) {
      if (micOn) {
        // disconnect audio
        socket.emit("callEndServer", myPeer.id);
      } else {
        // connect audio
        socket.emit("callStartServer", myPeer.id);
      }
      setMicOn((prev) => !prev);
    }
  };

  const connectAudio = () => {};

  const disconnectAudio = () => {};

  return (
    <>
      <div className={classes.flexCol}>
        <span className={classes.participantsText}>Participants</span>
        <span className={classes.voiceText}>Voice Connected</span>
        {connections.map((connection, index) => {
          return (
            <Fragment key={index}>
              <div className={classes.flexRow}>
                <Avatar alt="p" />
                <span className={classes.userText}>
                  {connection.displayName}
                </span>
                <span className={classes.userText}>
                  <MicNoneOutlinedIcon
                    onClick={() => clickHandler(connection)}
                  />
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CodeParticipants;
