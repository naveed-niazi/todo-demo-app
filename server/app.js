const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();
var cors = require("cors");

//--- importing all sort of routes

const authRoutes = require("./routes/authenticationRoute");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(passport.initialize());
//Database Connectivity
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((error) => {
    console.log("Error in connectivity: " + error);
  });

//checking connectivity to mongoose database
mongoose.connection.on("error", (err) => {
  console.log(err);
});

//all the necessary middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//default route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server Running" });
});
//all the routs used in app
app.use("/", authRoutes);
app.use("/", taskRoutes);

//expressJWT generate error, we are changing the jason response for that
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized Request" });
  }
});
const port = process.env.PORT || 8070;
app.listen(port, () => {
  console.log(`Server Running at port: ${process.env.PORT}`);
});
