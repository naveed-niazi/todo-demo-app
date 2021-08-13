import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Button, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { authenticate } from "../apiCalls/authenticationCalls";
import AddTaskForm from "../components/AddTaskForm";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from "../components/Navbar";
import AllTasks from "../components/AllTasks";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  main: {
    justifyContent: "center",
  },
}));
function AlertNew(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomePage = () => {
  const classes = useStyles();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [taskAdded, setTaskAdded] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);
  const [redirect, setRedirect]= useState(false)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
  };

  useEffect(() => {
    if (typeof window == "undefined" || !localStorage.getItem("jwt")) {
      setRedirect(true)
      setLoading(false);

    } else {
      //using json web token stored in local storage to verify the user
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      if (!valid) {
        authenticate(jwt.user._id, jwt.token).then((data) => {
          if (data || !data.error) {
            if (data.user) {
              setValid(true);
              setLoading(false);
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        });
      }
    }
  }, []);
  console.log("redirect",redirect);
  if(redirect){
    return <Redirect to="/signin"/>
  }

  return (
    <>
      <Navbar loggedIn={true} />
      <Container>
        {loading ? (
          <>
            <Box
              className={classes.root}
              display="flex"
              justifyContent="center"
              marginTop="2rem"
            >
              <CircularProgress />
            </Box>
          </>
        ) : !valid ? (
          <Box className={classes.root}>
            <Alert severity="error">
              Unauthorized access to the page. Please{" "}
              <RouterLink to="/signin" variant="body2">
                Signin
              </RouterLink>{" "}
              to continue
            </Alert>
          </Box>
        ) : (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignContent="center"
          >
            <Grid item xs={12} style={{ marginTop: "1rem" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                {showForm ? (
                  <RemoveIcon style={{ fontSize: 40, color: "darkgray" }} />
                ) : (
                  <AddIcon style={{ fontSize: 40, color: "darkgray" }} />
                )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div style={{ margin: "2rem" }}>
                {showForm && (
                  <AddTaskForm
                    setShowForm={setShowForm}
                    taskAdded={taskAdded}
                    setTaskAdded={setTaskAdded}
                    setSuccessMessage={setSuccessMessage}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <AllTasks refresh={taskAdded} />
            </Grid>
          </Grid>
        )}
        <Snackbar
          open={successMessage}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <AlertNew onClose={handleClose} severity="success">
            Task Added Successfully
          </AlertNew>
        </Snackbar>
      </Container>
    </>
  );
};
export default HomePage;
