import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "calc(5% + 60px)",
    bottom: "0px",
    position: 'sticky'
  },
}));

const Copyright = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://todo.com">
          TODO
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;
