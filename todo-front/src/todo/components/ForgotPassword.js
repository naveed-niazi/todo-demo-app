import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { forgotPassword } from "../apiCalls/authenticationCalls";

const forgotPasswordStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgotPassword = () => {
  const classes = forgotPasswordStyles();
  const [email, setEmail] = useState("");
  const [errorIn, setErrorIn] = useState("");
  const [resetError, setResetError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allowCode, setAllowCode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    var emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length < 1) {
      setErrorIn("email");
      setErrorMessage("Please enter valid email");
    } else if (!email.match(emailRegex)) {
      setErrorIn("email");
      setErrorMessage("Please enter valid email");
    } else {
      setErrorIn("");
      setErrorMessage("");
      const user = { email };
      setResetError(false);
      setLoading(true);
      forgotPassword(user).then((data) => {
        if (data.error) {
          setLoading(false);
          setResetError(true);
          setErrorMessage(data.error);
          setAllowCode(true);
        } else {
          setLoading(false);
          setAllowCode(true);
        }
      });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5">
                    {!allowCode ? "Forgot Password":"Forgot Password Requested"}
                  </Typography>
                </Grid>
                {!allowCode ? (
                    <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorIn("");
                    }}
                    error={errorIn === "email"}
                    helperText={errorIn === "email" ? errorMessage : ""}
                    autoComplete="email"
                  />
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
                Reset Password
              </Button>
              </>
              ) : resetError ? (
            <div className={classes.root}>
              <Alert severity="error">{errorMessage}</Alert>
            </div>
          ) : (
            <Box mt={5}>
              <Alert severity="success">
                Check your email to access reset passwork link
              </Alert>
            </Box>
          )}
              </Grid>
            </form>
         
        </div>
      </Container>
    </>
  );
};
export default ForgotPassword;
