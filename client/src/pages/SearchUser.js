import React from "react";
import Layout from "../components/Layout/Layout";
import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FollowerCard from "../components/FollowerCard/FollowerCard";

const SearchUser = () => {
  return (
    <>
      <Layout>
        <Grid container>
          <Grid item xs={12}>
            {[1, 1, 1].map((ele, i) => {
              return <FollowerCard key={i} />;
            })}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default SearchUser;
