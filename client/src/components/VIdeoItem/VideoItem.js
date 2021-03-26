import { Avatar, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import codeIMG from "../../assets/code.jpg";

const useStyles = makeStyles((themes) => ({
  videoBox: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    maxWidth: "350px",
    cursor: "pointer",
  },
  img: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem 1rem 1rem 0.4rem",
  },
  avatar: {
    backgroundColor: "blue",
    width: "45px",
    height: "45px",
    alignSelf: "center",
  },
  title: {
    padding: "0 1rem",
    fontWeight: "600",
    fontSize: "1.2rem",
  },
  subtitle: {
    color: "#aaaaaa",
    fontSize: "0.9rem",
    fontWeight: "400",
    padding: "0.5rem 1rem",
  },
}));

const VideoItem = ({
  item: {
    title,
    views,
    postedBy: { displayName, avatar_url },
    _id,
  },
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      item
      xs={3}
      onClick={() => {
        history.push(`/view/${_id}`);
      }}
    >
      <div className={classes.videoBox}>
        <img src={codeIMG} alt="thumbnail" className={classes.img} />
        <div className={classes.flexRow}>
          <Avatar
            className={classes.avatar}
            alt={displayName}
            src={avatar_url}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={classes.title}>{title}</span>
            <span className={classes.subtitle}>{displayName}</span>
            <span className={classes.subtitle} style={{ padding: "0 1rem" }}>
              {views} Views
            </span>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default VideoItem;
