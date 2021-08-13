import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { deleteTask } from "../apiCalls/taskCalls";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UpdateTaskForm from "./UpdateTaskForm";

const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
    width: "100%",
  },
});
function AlertNew(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ShowTask({ data, update, setUpdate }) {
  const classes = useStyles();

  const [task, setTask] = useState(data);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const deleteTodo = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteTask(task._id).then((data) => {
      if (data) {
        if (data.error) {
          setLoading(false);
          setSuccess("failed");
        } else {
          setOpen(!open);
          setUpdate(++update);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setSuccess("failed");
      }
    });
  };
  const updateTodo = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {task.task}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {task.detail}
          </Typography>
        </CardContent>
      </CardActionArea>
      {!loading ? (
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={updateTodo}
          >
            <EditIcon fontSize="small" />
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={deleteTodo}
          >
            <DeleteOutlineIcon fontSize="small" />
            Delete
          </Button>
        </CardActions>
      ) : (
        <CardActions style={{ justifyContent: "center" }}>
          <CircularProgress />
        </CardActions>
      )}
      
      {success === "failed" && (
        <div className={classes.root}>
          <Alert severity="error">Unable to delete task! Try again.</Alert>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <AlertNew onClose={handleClose} severity="success">
          Task Deleted Successfully
        </AlertNew>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Update Task"}</DialogTitle>
        <DialogContent>
          <UpdateTaskForm data={task} setData={setTask} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
