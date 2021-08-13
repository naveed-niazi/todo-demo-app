const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();
const User = require("../models/user");
const _ = require("lodash");
const {
  sendConfirmationEmail,
  resetPasswordEmail,
} = require("../helper/emailConfig.js");

//creating new user
exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists instanceof User) {
    return res
      .status(403)
      .json({ error: "User already exist. Please signin!" });
  }

  const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);

  const user = await new User(req.body);
  user.name = req.body.name;
  user.emailVerficationCode = token;
  await user.save((err) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Unable to create account, Try again!" });
    }
    sendConfirmationEmail(user.name, user.email, user.emailVerficationCode);
    return res
      .status(200)
      .json({
        message:
          "Signup successful! Please check your email to verify your account.",
      });
  });
};
//verifying user email
exports.verifyUser = async (req, res, next) => {
  const userExists = await User.findOne({
    emailVerficationCode: req.params.confirmationCode,
  });
  if (userExists) {
    userExists.status = "Active";
    userExists.save((err) => {
      if (err) return res.status(500).json({ error: "Unable to verify user" });
      else
        return res.status(200).json({
          message: "User verified sucessfully! Please signin.",
        });
    });
  } else
    return res
      .status(400)
      .json({ error: "Verification link expired, please sign up" });
};

exports.signin = async (req, res) => {
  //find the user based on email
  const { email, password } = req.body;

  await User.findOne({ email }, (err, user) => {
    //incase we don't find the user
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please signup.",
      });
    }
    //to authenticate users password
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    if (user.status != "Active") {
      return res.status(401).json({
        error: "Account is pending verification. Please Verify Your Email!",
      });
    }

    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, _id: user._id },
      process.env.SECRET_KEY
    );
    // res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email } = user;
    // req.session.token = token;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.length > 6 && regex.test(email)) {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          error: "User does not exsist. ",
        });
      }
      const token = jwt.sign({ _id: user._id, email }, process.env.SECRET_KEY, {
        expiresIn: "30m",
      });
      user.updateOne({ resetPasswordLink: token }, function (err, success) {
        if (err) {
          return res
            .status(400)
            .json({ error: "Unable to generate reset link" });
        } else {
          resetPasswordEmail(user.name, email, token);
          return res.status(200).json({
            message:
              "A verification email to reset your password has been sent to your email address. Please check your email to reset your password. ",
          });
        }
      });
    });
  } else {
    return res.status(400).json({ error: "Invlid Input" });
  }
};

exports.resetPassword = (req, res) => {
  if (req.params.resetCode) {
    jwt.verify(
      req.params.resetCode,
      process.env.SECRET_KEY,
      function (error, decodeData) {
        if (error) {
          return res.json({
            error: "Incorrect token or it is expired.",
          });
        }
        User.findOne(
          { resetPasswordLink: req.params.resetCode },
          (err, user) => {
            if (err || !user)
              return res.status(400).json({
                error: "Password reset token is invalid or has expired",
              });
            else
              return res.status(200).json({
                message: `Hello ${user.name}, your verification has been completed. Please update your password.`,
              });
          }
        );
      }
    );
  } else {
    return res.status(401).json({ error: "Reset password link expired!" });
  }
};

exports.setNewPassword = (req, res) => {
  const { resetCode } = req.params;
  if (resetCode) {
    jwt.verify(resetCode, process.env.SECRET_KEY, function (error, decodeData) {
      if (error) {
        return res.json({
          error: "Authorization token invalid",
        });
      }
      const password = req.body.password;
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (password && regex.test(password)) {
        User.findOne({ resetPasswordLink: resetCode }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Unable to find user",
            });
          }

          const data = {
            password: req.body.password,
            resetLink: " ",
          };
          //using lodash to update the user with the new attributes in data
          user = _.extend(user, data);
          user.save((err, result) => {
            if (err)
              return res.status(400).json({ error: "Reset password error." });
            else
              return res.status(200).json({
                message: "Password changed successfully",
              });
          });
        });
      } else {
        return res.status(400).json({ error: "Invalid password" });
      }
    });
  } else {
    return res.status(401).json({ error: "Reset password link expired!" });
  }
};
//checking for the valid jwt token
exports.requireSignin = expressJwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Unable to find User!" });
    } else {
      user.salt = undefined;
      user.hashed_password = undefined;
      user.emailVerificationCode = undefined;
      req.profile = user; //adding a parameter object of profile with info about user in the req

      next();
    }
  });
};

exports.getUser = (req, res) => {
  if (req.auth._id == req.profile._id)
    return res.status(200).json({ message: "valid user", user: req.profile });
  else return res.status(400).json({ error: "invalid user" });
};
