import React, { useEffect, useState, useRef } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import {
  Backdrop,
  Button,
  Divider,
  Fade,
  FormControl,
  makeStyles,
  MenuItem,
  Modal,
  Paper,
  Select,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useDispatch, useSelector } from "react-redux";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import { ClearActiveFile, writeCode } from "../../redux/actions";
import { debounce } from "lodash";
import { useParams } from "react-router-dom";

// -->
import axios from "axios";
import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
// import json1 from "ot-json1";
// -->

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "2rem 0 0 0",
    display: "flex",
    flexDirection: "column",
  },
  languageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: "0 0.5rem",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },
  select: {
    color: "#fff",
    width: "200px",
    border: "2px solid #3f51b5",
  },
  tabs: {
    backgroundColor: "rgba(88,88,88,.5)",
    color: "#fff",
    borderRadius: "10px 10px 0 0",
    padding: "0.6rem",
    width: "fit-content",
    display: "flex",
    border: "0.5px solid #48494B",
  },
  closeIcon: {
    "&:hover": {
      color: "#3f51b5",
      cursor: "pointer",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    alignSelf: "center",
    "&:focus": {
      outline: "none",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1F1F1F",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "20px",
    width: "1000px",
    "&:focus": {
      outline: "none",
    },
  },
}));

const EditorComponent = ({
  startRecording,
  stopRecording,
  status,
  mediaBlobUrl,
}) => {
  // -->
  const { id } = useParams();
  const [state, setState] = useState({ code: "State Code" });
  const socket = useRef();
  const connection = useRef();
  useEffect(() => {
    // socket.current = new ReconnectingWebSocket("ws://localhost:8080");
    // connection.current = new sharedb.Connection(socket.current);
    // const doc = connection.current.get("documents", "123");
    // doc.subscribe((err) => {
    //   console.log("sub", doc);
    //   if (doc.data) {
    //     setState(doc.data);
    //     // dispatch(writeCode(doc.data.code));
    //   }
    // });
    // doc.on("op", (op, source) => {
    //   console.log("op", op);
    //   // if (!source) {
    //   setState({ code: doc.data.code });
    //   // dispatch(writeCode(op));
    //   // }
    // });
  }, []);
  // -->

  const classes = useStyles();
  const [language, setLanguage] = useState("javascript");
  const dispatch = useDispatch();
  const code = useSelector((state) => state.code);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditorChange = (e, value) => {
    console.log(e);
    console.log(value.length);
    setState({ code: value });
    // ot
    // debounce(dispatch(writeCode(value)), 3000);
    // !!!!!!!
    /*console.log({ prev: state.code, new: value });
    connection.current
      .get("documents", "123")
      .submitOp([{ p: ["code"], od: state.code, oi: value }]);
    setState({ code: value });
    */
    // !!!!!!!
    // dispatch(writeCode(value));
  };

  const previewModal = () => {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h3>Preview and Upload Video</h3>
              <Divider style={{ backgroundColor: "#fff" }} />
              <br />
              <video
                src={mediaBlobUrl}
                autoPlay
                className={classes.video}
                controls
              />
            </div>
          </Fade>
        </Modal>
      </>
    );
  };

  const preview = () => {
    handleOpen();
  };

  return (
    <>
      {previewModal()}
      <div className={classes.container}>
        <div className={classes.languageContainer}>
          <div className={classes.subContainer}>
            <span style={{ fontSize: "1.3rem", margin: "auto 0 auto 0" }}>
              Language&nbsp;&nbsp;
            </span>
            <FormControl variant="filled" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                inputProps={{
                  className: classes.select,
                }}
                variant="outlined"
              >
                <MenuItem value={"javascript"}>javascript</MenuItem>
                <MenuItem value={"typescript"}>typescript</MenuItem>
                <MenuItem value={"python"}>python</MenuItem>
              </Select>
            </FormControl>
          </div>
          {status === "recording" ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<VideocamOffIcon />}
              onClick={() => {
                stopRecording();
              }}
            >
              Stop Recording
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<VideocamIcon />}
              onClick={() => {
                startRecording();
              }}
            >
              Start Recording
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={preview}
            startIcon={<VisibilityIcon />}
            disabled={!mediaBlobUrl}
          >
            Preview
          </Button>
        </div>
        <br />
        <div className={classes.languageContainer}>
          {code.activeFile && (
            <Paper elevation={0} className={classes.tabs}>
              <span>{code.activeFile?.name}</span>
              <span>
                <CloseIcon
                  fontSize="small"
                  className={classes.closeIcon}
                  onClick={() => {
                    dispatch(ClearActiveFile());
                  }}
                />
              </span>
            </Paper>
          )}
        </div>
        {code.activeFile ? (
          <ControlledEditor
            height="80vh"
            value={state.code}
            onChange={handleEditorChange}
            theme="dark"
            language={language}
          />
        ) : (
          <h1>Select A File</h1>
        )}
      </div>
    </>
  );
};

export default EditorComponent;
