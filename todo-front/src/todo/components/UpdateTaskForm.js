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
import { updateTask } from "../apiCalls/taskCalls";
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

const UpdateTaskForm = ({ data, setData }) => {
  const classes = useStyles();
  const [task, setTask] = useState(data.task);
  const [detail, setDetail] = useState(data.detail);
  const [errorIn, setErrorIn] = useState("");
  const [updateTaskError, setUpdateTaskError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateTaskError("")
    setSuccessMessage("")
    const todo = { task, detail };
    setLoading(true);
    updateTask(todo, data._id).then((response) => {
      if (response) {
        if (response.error) {
          setLoading(false);
          if (response.errorIn) {
            setErrorMessage(response.error);
            setErrorIn(response.errorIn);
          } else setUpdateTaskError(response.error);
        } else {
          setData({ _id: data._id, task: todo.task, detail: todo.detail });
          setSuccessMessage("Task updated successfully");
          setLoading(false);
        }
      } else {
        setLoading(false);
        setUpdateTaskError("Unable to conect to database");
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
                required
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
          {updateTaskError && (
            <div className={classes.root}>
              <Alert severity="error">{updateTaskError}</Alert>
            </div>
          )}
          {successMessage ? (
            <div className={classes.submit}>
              <Alert severity="success">{successMessage}</Alert>
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Task
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
};
export default UpdateTaskForm;
