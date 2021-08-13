import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";
import { getTasks } from "../apiCalls/taskCalls";
import Alert from "@material-ui/lab/Alert";

import ShowTask from "./ShowTask"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display:"flex",
        justifyContent:"center",
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AllTasks = (refresh) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate]= useState(0);

  const [tasks, setTasks] = useState(true);
  
  
  useEffect(() => {
    getTasks().then((data) => {
      setLoading(true);
      if (data) {
        if (data.error) {
          setLoading(false);
          setSuccess(false);
        } else {
          if (data.tasks) {
            setTasks(data.tasks.reverse());
            setLoading(false);
            setSuccess(true);
          }
        }
      } else {
        setLoading(false);
        setSuccess(false);
      }
    });
  }, [refresh, update]);
  return (
    <React.Fragment>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : success ? (
        <>
            {tasks.length===0 &&
            <Container>
            <Alert severity="success" variant="filled">
              {"No tasks at the moment. Create a new Task :)"}
            </Alert>
          </Container>

            }
            {tasks.map((todo, key) => (
              <ShowTask key={key} data={todo} setUpdate={setUpdate} update={update} />
            ))}
        </>
      ) : (
        <Container>
          <Alert severity="error" variant="filled">
            {" Unable to fetch tasks :("}
          </Alert>
        </Container>
      )}
    </React.Fragment>
  );
};
export default AllTasks;
