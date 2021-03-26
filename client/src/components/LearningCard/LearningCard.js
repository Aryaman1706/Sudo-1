import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "200px",
    width: "200px",
    borderRadius: "20px",
    backgroundColor: "#a40606",
    backgroundImage: "linear-gradient(315deg, #a40606 0%, #d98324 74%)",
    color: "white",
    padding: "1rem",
    fontWeight: "900",
    fontSize: "1.6rem",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 0.2s linear",
      cursor: "pointer",
    },
  },
}));

const LearningCard = ({ topic }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid item xs={3}>
      <Paper
        className={classes.card}
        onClick={() => {
          history.push("/learningpath/id");
        }}
      >
        {topic}
      </Paper>
    </Grid>
  );
};

export default LearningCard;
