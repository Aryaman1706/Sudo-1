import React from "react";
import { makeStyles } from "@material-ui/core";
import SideNav from "../SideNav/SideNav";

const useStyles = makeStyles((theme) => ({
  sideNav: {
    // borderRight: "1px solid grey",
    height: "calc(100% - 70px)",
    position: "fixed",
    width: "300px",
    top: 70,
    left: 0,
  },
  borderClass: {
    border: "1px solid grey",
  },
  heightClass: {
    height: "50vh",
  },
  main: {
    marginLeft: "300px",
    padding: "0px 10px",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.sideNav}>
        <SideNav />
      </div>
      <div className={classes.main}>{children}</div>
    </>
  );
};

export default Layout;
