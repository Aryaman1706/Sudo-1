import React, { useEffect } from "react";
import {
  Avatar,
  Grid,
  MenuItem,
  Menu,
  InputBase,
  Button,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import CodeLogo from "../../assets/code.svg";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../redux/actions";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  parent: {
    top: "0",
    backgroundColor: "#000015",
    position: "sticky",
    width: "100%",
    zIndex: "100",
  },
  appbar: {
    height: "70px",
    placeItems: "center",
    width: "100%",
    boxShadow: "0px 3px 5px 0px rgba(50, 50, 50, 0.75)",
    padding: "0 1rem 0 1rem",
  },
  logo: {
    fontWeight: "bolder",
    fontSize: "1.6rem",
    margin: "auto 0 auto 0",
    paddingLeft: "0.5rem",
  },
  logoImg: {
    height: "auto",
    width: "3rem",
    objectFit: "contain",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    display: "flex",
    flexDirection: "row",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(loginUser());
  }, []);
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        className={classes.parent}
      >
        <Grid item xs={12} className={classes.appbar}>
          <Grid
            container
            spacing={0}
            style={{ height: "70px", placeItems: "center" }}
            justify="space-between"
          >
            <Grid
              item
              xs={4}
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() => {
                history.push("/home");
              }}
            >
              <img src={CodeLogo} alt="logo" className={classes.logoImg} />
              <span className={classes.logo}>Sudo</span>
            </Grid>
            {auth.isAuthenticated && (
              <>
                <Grid item xs={4}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search User"
                      fullWidth
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => history.push("/users")}
                    >
                      Search
                    </Button>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Avatar
                    src={auth.user?.avatar_url}
                    alt={auth.user?.displayName}
                  />
                  <span
                    style={{
                      margin: "auto 0 auto 0",
                      paddingLeft: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {auth.user?.displayName}
                  </span>
                  <span style={{ margin: "auto 0 auto 0" }}>
                    <ArrowDropDownIcon
                      style={{ cursor: "pointer" }}
                      onClick={handleClick}
                    />
                  </span>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        history.push("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Nav;
