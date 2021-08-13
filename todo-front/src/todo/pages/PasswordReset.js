import React from "react";

import Box from "@material-ui/core/Box";

import Navbar from "../components/Navbar";
import ResetPasswordForm from "../components/ResetPasswordForm";
import Copyright from "../components/Copyright";

const ResetPassword = (props) => {
  return (
    <>
      <Navbar link={"Signin"} name={"LOGIN"}></Navbar>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10rem",
        }}
      >
        <ResetPasswordForm resetId={props.match.params.resetId}/>
      </Box>
      <Copyright />
    </>
  );
};

export default ResetPassword;
