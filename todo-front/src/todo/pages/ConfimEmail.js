import React, { useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import {Redirect} from "react-router-dom"
import Navbar from "../components/Navbar";
import { verifyUser } from "../apiCalls/authenticationCalls";

const ConfirmEmail = (props) => {
  const [message, setMessage] = useState("");

  if (props.match.path === "/confirm/:confirmationCode") {
    verifyUser(props.match.params.confirmationCode).then((response) => {
      setMessage(response.message);
    });
  }
 if(message){
     return <Redirect to="/signin"/>
  }

  return (
    <>
      <Navbar link={"signin"} name={"LOGIN"} />
      <div className="container">
        <Box justifyContent="center">
          <header className="jumbotron">
            {!message ? (
              <Box mt={5} display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Box mt={5} display="flex" justifyContent="center">
                {message}
              </Box>
            )}
          </header>
        </Box>
      </div>
    </>
  );
};

ConfirmEmail.propTypes = {
  match: PropTypes.any,
};
export default ConfirmEmail;
