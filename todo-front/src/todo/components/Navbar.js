import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {},
}));

const TopBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              TODO
            </Typography>
            {props.loggedIn ? (
              <RouterLink
              to={`signin`}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Logout
            </RouterLink>
            ) : (
              <RouterLink
                to={`${props.link}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                {props.name}
              </RouterLink>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default TopBar;
