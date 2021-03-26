import React, { useRef, useState } from "react";
import { Avatar, makeStyles, Tooltip } from "@material-ui/core";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

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
  inviteText: {
    marginTop: "1rem",
    fontWeight: "500",
  },
  textArea: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    "&:focus": {
      outline: "none",
    },
  },
}));

const RoomInfo = () => {
  const classes = useStyles();
  const textAreaRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    setCopySuccess(true);
    e.target.focus();
  }

  return (
    <>
      <div className={classes.flexCol}>
        <span className={classes.participantsText}>Room Info</span>
        <span className={classes.voiceText}>Room Name: Room</span>
        <span className={classes.inviteText}>Invite Code:</span>
        <span className={classes.flexRow} style={{ margin: 0 }}>
          <textarea
            className={classes.textArea}
            ref={textAreaRef}
            value="http://localhost:3000/coderoom"
          />
          <span className={classes.userText}>
            <Tooltip title={!copySuccess ? "Copy" : "Copied"}>
              <FileCopyOutlinedIcon
                fontSize="small"
                onClick={copyToClipboard}
              />
            </Tooltip>
          </span>
        </span>
      </div>
    </>
  );
};

export default RoomInfo;
