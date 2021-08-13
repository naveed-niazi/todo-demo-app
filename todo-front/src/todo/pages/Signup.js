import React from "react";

import Box from "@material-ui/core/Box";

import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
import Copyright from "../components/Copyright"

export default function Signup() {
  return (
    <>
      <Navbar link={"/signin"} name={"Sign In"} />
      <Box style={{ display: "flex", justifyContent: "center", marginTop:"10rem"}}>
        <SignupForm />
      </Box>
      <Copyright/>
    </>
  );
}
