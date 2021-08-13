const express = require("express");
const {
      signup,
      verifyUser,
      signin,
      forgotPassword,
      resetPassword,
      setNewPassword,
      userById,
      requireSignin,
      getUser
} = require("../controllers/authentication");
const { signupValidator } = require('../middleware/signupValidator');

const router = express.Router();


router.post('/signin', signin);
router.post("/signup", signupValidator, signup);

router.get("/confirm/:confirmationCode", verifyUser);
router.get("/authenticate/:userId", requireSignin, getUser);

router.put('/forgot-password', forgotPassword)
router.get('/reset-password/:resetCode', resetPassword)
router.put('/reset-password/:resetCode',setNewPassword)

router.param('userId', userById);
module.exports = router;