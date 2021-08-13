import React, { useState } from "react";
//---
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


import { createTask } from "../apiCalls/taskCalls";
const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  formControl: {
    width: "100%  ",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const AddTaskForm = ({ setShowForm, taskAdded , setTaskAdded, setSuccessMessage}) => {
  const classes = useStyles();
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");

  const [errorIn, setErrorIn] = useState("");
  const [addTaskError, setAddTaskError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddTaskError("")
    const todo = { task, detail };
    setLoading(true);

    createTask(todo).then((data) => {
      if (data) {
        if (data.error) {
          if (data.errorIn) {
            setErrorIn(data.errorIn);
            setErrorMessage(data.error);
          } else {
            setAddTaskError(data.error);
          }
          setLoading(false);
        } else {
          setSuccessMessage(true);
          setAddTaskError(++taskAdded)
          setTask("")
          setDetail("")
          setLoading(false);
          setShowForm(false)
        }
      } else {
        setLoading(false);
        addTaskError("Unable to connect to database :(");

      }
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="task"
                name="task"
                variant="outlined"
                required
                fullWidth
                id="task"
                label="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                error={errorIn === "task"}
                helperText={errorIn === "task" ? errorMessage : ""}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                fullWidth
                type="text-area"
                id="detail"
                label="Task Detail"
                name="detail"
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                  setErrorIn("");
                }}
                error={errorIn === "detail"}
                helperText={errorIn === "detail" ? errorMessage : ""}
                autoComplete="detail"
              />
            </Grid>
          </Grid>
          {loading ? (
            <Box
              className={classes.root}
              display="flex"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            ""
          )}
          {addTaskError && (
            <div className={classes.root}>
              <Alert severity="error">{addTaskError}</Alert>
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Task
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default AddTaskForm;
