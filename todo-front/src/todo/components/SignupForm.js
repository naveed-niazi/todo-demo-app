import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { validation } from "../helpers/signinHelp";
import { signup } from "../apiCalls/authenticationCalls";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorIn, setErrorIn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Error = await validation(name, email, password);
    setErrorIn(Error.errorIn);
    setErrorMessage(Error.error);
    if (Error.error === "") {
      const user = {
        name:name,
        email: email,
        password: password,
      };
      setLoading(true);
      setSignupError("");
      signup(user).then((response) => {
        if (response) {
          if (response.error) {
            setLoading(false);
            setSignupError(response.error);
          } else {
            setLoading(false);
            setSignupSuccess(response.message);
          }
        } else {
          setLoading(false);
          setSignupError("Unable to Connect");
        }
      });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" alignText="center">
          {signupSuccess ? "Sign up Sucessful!" : "Sign up"}
          </Typography>
          {signupSuccess ? (
            <Box
              className={classes.root}
              display="flex"
              justifyContent="center"
              marginTop="5rem"
            >
              <Alert severity="success">
                {signupSuccess}{" Please "}
                <RouterLink to="/signin" variant="body2">
                   Signin
                </RouterLink>
              </Alert>
            </Box>
          ) : (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {signupError && (
                  <Grid item xs={12}>
                    <Alert severity="error">{signupError}</Alert>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorIn("");
                    }}
                    error={errorIn === "name"}
                    helperText={errorIn === "name" ? errorMessage : ""}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
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
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorIn("");
                    }}
                    InputProps={{ // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    error={errorIn === "password"}
                    helperText={errorIn === "password" ? errorMessage : ""}
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/signin" variant="body2">
                    Already have an account? Signin
                  </RouterLink>
                </Grid>
              </Grid>
              {loading && (
                <Box pt={3} display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
            </form>
          )}
        </div>
      </Container>
    </>
  );
};
export default SignupForm;
