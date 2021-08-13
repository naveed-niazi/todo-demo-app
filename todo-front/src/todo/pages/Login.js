import React, {useEffect} from "react";

import Box from "@material-ui/core/Box";

import Navbar from "../components/Navbar";
import SigninForm from "../components/SigninForm";
import Copyright from "../components/Copyright"


export default function Login() {

    useEffect(()=>{
        //when we come to this page user will be automatically loggedout
        if (typeof window !== "undefined") {
            localStorage.removeItem("jwt")
          }
    })
  return (
    <>
      <Navbar link={"/signup"} name={"Sign Up"} />
      <Box style={{ display: "flex", justifyContent: "center", marginTop:"10rem" }}>
        <SigninForm />
      </Box>
      <Copyright/>
      </>
  );
}
