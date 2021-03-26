import React, { useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { useDispatch, useSelector } from "react-redux";
import { createFile, createFolder, setActiveFile } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "3rem 1rem 3rem 1rem",
  },
  btn: {
    borderRadius: "10px",
    height: "25px",
    backgroundColor: "#197fdd",
    color: "#fff",
    marginTop: "1rem",
    width: "100px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "90%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#1F1F1F",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "20px",
    width: "600px",
    "&:focus": {
      outline: "none",
    },
  },
  input: {
    color: "#fff",
    border: "2px solid #3f51b5",
    borderRadius: "2px",
    "&:hover": {
      outline: "none",
    },
    "&:focus": {
      border: "none",
    },
  },
  select: {
    color: "#fff",
  },
}));

const CodeExplorer = ({ setMode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const code = useSelector((state) => state.code);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [createFolderName, setCreateFolderName] = useState("");
  const [createFileName, setCreateFileName] = useState("");
  const [currentFolder, setCurrentFolder] = useState("");

  const CreateNewFolder = () => {
    const folder = {
      folder: createFolderName,
      files: [],
    };
    dispatch(createFolder(folder));
    setOpen(false);
  };

  const CreateNewFile = () => {
    const file = {
      name: createFileName,
      code: "",
    };
    dispatch(createFile(file, currentFolder));
    setOpen2(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCreateFolderName("");
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setCreateFolderName("");
  };

  const handleChangeFolder = (value) => {
    setCurrentFolder(value);
  };

  const folderModal = () => {
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
              <h3>New Folder</h3>
              <Divider style={{ backgroundColor: "#fff" }} />
              <br />
              <TextField
                label="Folder Name"
                inputProps={{
                  className: classes.input,
                }}
                fullWidth
                variant="outlined"
                value={createFolderName}
                onChange={(e) => {
                  setCreateFolderName(e.target.value);
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "1.6rem",
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    marginRight: "5px",
                    color: "#fff",
                    borderColor: "#fff",
                  }}
                  onClick={() => {
                    setOpen(false);
                    setCreateFolderName("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={createFolderName === "" ? true : false}
                  color="primary"
                  onClick={() => {
                    CreateNewFolder();
                  }}
                >
                  Create Folder
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </>
    );
  };

  const fileModal = () => {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open2}>
            <div className={classes.paper}>
              <h3>New File</h3>
              <Divider style={{ backgroundColor: "#fff" }} />
              <br />
              <FormControl
                variant="filled"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Select A Folder
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={currentFolder}
                  onChange={(e) => {
                    handleChangeFolder(e.target.value);
                  }}
                  inputProps={{
                    className: classes.select,
                  }}
                >
                  {code.fileStructure.map((item) => (
                    <MenuItem value={item.folder}>{item.folder}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <TextField
                label="File Name"
                inputProps={{
                  className: classes.input,
                }}
                fullWidth
                variant="outlined"
                value={createFileName}
                onChange={(e) => {
                  setCreateFileName(e.target.value);
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "1.6rem",
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    marginRight: "5px",
                    color: "#fff",
                    borderColor: "#fff",
                  }}
                  onClick={() => {
                    setOpen2(false);
                    setCreateFileName("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={createFileName === "" ? true : false}
                  color="primary"
                  onClick={() => {
                    CreateNewFile();
                  }}
                >
                  Create File
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </>
    );
  };

  return (
    <>
      {folderModal()}
      {fileModal()}
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              className={classes.btn}
              startIcon={<AddIcon />}
              onClick={handleOpen2}
            >
              File
            </Button>
            <Button
              variant="contained"
              className={classes.btn}
              startIcon={<CreateNewFolderIcon />}
              onClick={handleOpen}
            >
              Folder
            </Button>
            <Button
              variant="contained"
              className={classes.btn}
              style={{ backgroundColor: "#a92027", width: "fit-content" }}
              onClick={() => setMode((prev) => !prev)}
            >
              Start Drawing
            </Button>
            <Button
              variant="contained"
              className={classes.btn}
              startIcon={<PlayArrowIcon />}
            >
              Run
            </Button>
          </div>
        </Grid>
        <Grid item xs={10} style={{ marginTop: "1rem" }}>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {code.fileStructure.map((item, index) => (
              <TreeItem nodeId={index} label={item.folder}>
                {item.files.map((files, index) => (
                  <TreeItem
                    nodeId={index}
                    label={files.name}
                    icon={<InsertDriveFileIcon />}
                    onClick={() => {
                      dispatch(setActiveFile(files));
                    }}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeView>
        </Grid>
      </Grid>
    </>
  );
};

export default CodeExplorer;
