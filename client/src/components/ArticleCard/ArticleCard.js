import { Chip, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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

const ArticleCard = ({ item }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Grid
        container
        spacing={4}
        onClick={() => {
          window.open(`${item.url}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <Grid item xs={12}>
          <Paper elevation={8} className={classes.paper}>
            <div className={classes.flexRow} style={{ placeItems: "center" }}>
              <div
                className={classes.flexCol}
                style={{ margin: "auto 0 auto 0" }}
              >
                <div className={classes.question}>{item.title}</div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ArticleCard;
