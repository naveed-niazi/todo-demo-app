import React from "react";

import Box from "@material-ui/core/Box";

import Navbar from "../components/Navbar";
import ForgotPassword from "../components/ForgotPassword";
import Copyright from "../components/Copyright"


export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar link={"/signup"} name={"Sign Up"} />
      <Box style={{ display: "flex", justifyContent: "center", marginTop:"10rem" }}>
        <ForgotPassword />
      </Box>
      <Copyright/>
      </>
  );
}
