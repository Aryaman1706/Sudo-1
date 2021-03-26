import React, { useState } from "react";
import { Grid, Divider, Button, Avatar } from "@material-ui/core";
import moment from "moment";

const InfoCard = ({ info }) => {
  const { user, asked } = info;

  return (
    <div
      style={{
        backgroundColor: "#000015",
        color: "white",
        borderRadius: 10,
        padding: "5px 15px",
      }}
    >
      <h5 style={{ marginBottom: "0px" }}>{moment(asked).fromNow()}</h5>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserCard user={user} />
      </div>
    </div>
  );
};
const UserCard = ({ user }) => (
  <>
    <Avatar alt="" src={user.avatar_url} />
    <div
      style={{
        alignItems: "center",
        display: "flex",
        padding: "0 1rem 0 1rem",
      }}
    >
      <p>{user.username}</p>
    </div>
  </>
);
const Comment = ({ comment }) => (
  <>
    <Grid item xs={12} style={{ marginTop: "1rem" }}>
      <Divider
        style={{
          backgroundColor: "#fff",
        }}
      />
    </Grid>
    <Grid item xs={12} style={{ marginTop: "0.8rem" }}>
      {comment.data}
    </Grid>
  </>
);

const PostComment = ({ postComment }) => {
  const [newCommentData, setNewCommentData] = useState("");
  return (
    <>
      <input
        value={newCommentData}
        onChange={(e) => setNewCommentData(e.target.value)}
        style={{
          marginBottom: "10px",
          display: "block",
          width: "70%",
          borderRadius: "5px",
          lineHeight: "1.8em",
          height: "30px",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid #197fdd",
          marginRight: "1rem",
          marginTop: "0.5rem",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          postComment(newCommentData);
          setNewCommentData("");
        }}
      >
        Add Comment
      </Button>
    </>
  );
};
export { Comment, UserCard, InfoCard, PostComment };
