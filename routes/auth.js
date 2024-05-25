const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Enter Valid E-mail")
      .custom((value, { req }) => {
        return User.findByEmail(value).then((user) => {
          if (user) {
            return Promise.reject("User already exists!!");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password minimum length must be 5")
      .trim()
      .isLength({ min: 5 }),
    body("name", "Invalid name").isString().isLength({ min: 3 }) ,
  ],
  authController.postSignup
);

router.post('/login',authController.postLogin);

module.exports = router;
