import { Chip, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "transparent",
    color: "#fff",
    minHeight: "100px",
    height: "fit-content",
    padding: "0.8rem",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 0.2s linear",
    },
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    margin: "0 .5rem 0 0",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem 0 0 0",
  },
  center: {
    margin: "auto",
    fontSize: "1.2rem",
  },
  question: {
    fontSize: "1.6rem",
  },
  chip: {
    marginRight: "5px",
  },
}));

const ForumExploreCard = ({ question }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Grid
        container
        spacing={4}
        onClick={() => {
          history.push(`/forum/${question._id}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <Grid item xs={12}>
          <Paper elevation={8} className={classes.paper}>
            <div className={classes.flexRow} style={{ placeItems: "center" }}>
              <div className={classes.flexCol}>
                <span className={classes.center}>{question.votes}</span>
                <span>votes</span>
              </div>
              <div className={classes.flexCol}>
                <span className={classes.center}>
                  {question.answers.length}
                </span>
                <span>answers</span>
              </div>
              <div className={classes.flexCol} style={{ margin: 0 }}>
                <div className={classes.question}>{question.title}</div>
                <div className={classes.flexRow}>
                  {question.tags.map((tag) => (
                    <Chip
                      key={tag._id}
                      label={tag.name}
                      className={classes.chip}
                    />
                  ))}
                  {/* <Chip label="NodeJS" className={classes.chip} /> */}
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ForumExploreCard;
