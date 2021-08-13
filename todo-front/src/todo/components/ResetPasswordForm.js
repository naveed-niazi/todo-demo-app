import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { newPassword } from "../apiCalls/authenticationCalls";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       
    },
    root: {
        marginTop: theme.spacing(2),
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ResetPassword(props) {
    const classes = useStyles();


  const [resetId, setResetId] = useState(props.resetId);
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");

  const [errorIn, setErrorIn] = useState("");
  const [resetError, setResetError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password !== passwordC) {
      setErrorIn("passwordC");
      setErrorMessage("Password don't match");
    } else if (!password.match(passwordRegex)) {
      setErrorMessage(
        "Password must contain minimum eight characters, at least one letter and one number.(no special characters are allowed)"
      );
      setErrorIn("password");
    } else {
      setErrorMessage("");
      setErrorIn("");
      const Password = { password };
      setLoading(true);
      newPassword(resetId, Password).then((data) => {
        if (data.error) {
          setLoading(false);
          setResetError(true);
          setErrorMessage(data.error);
          setRedirect(true);
        } else {
          setLoading(false);
          setRedirect(true);
        }
      });
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {!redirect ? (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorIn("");
                    }}
                    error={errorIn === "password"}
                    helperText={errorIn === "password" ? errorMessage : ""}
                    autoComplete="code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="passwordC"
                    label="Confirm New Password"
                    name="passwordC"
                    type="password"
                    value={passwordC}
                    onChange={(e) => {
                      setPasswordC(e.target.value);
                      setErrorIn("");
                    }}
                    error={errorIn === "passwordC"}
                    helperText={errorIn === "passwordC" ? errorMessage : ""}
                    autoComplete="passwordC"
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          ) : resetError ? (
            <div className={classes.root}>
              <Alert severity="error">{errorMessage}</Alert>
            </div>
          ) : (
            <Box mt={5}>
              <Alert severity="success">
                Password Reset, Please{` `}{" "}
                <RouterLink to="/signin">Sign In!</RouterLink>
              </Alert>
            </Box>
          )}
        </div>
      </Container>
    </>
  );
}
