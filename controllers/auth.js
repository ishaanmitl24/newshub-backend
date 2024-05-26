const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObject = new Error("Validation failed");
    errorObject.statusCode = 422;
    errorObject.data = errors.array();
    throw errorObject;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hasPas) => {
      const user = new User(email, hasPas, name);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "user created successfully!!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadeduser;

  User.findByEmail(email)
    .then((user) => {
      if (!user) {
        const error = new Error(`User ${email} not found `);
        error.statusCode = 401;
        throw error;
      }
      loadeduser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadeduser.email, userId: loadeduser._id.toString() },
        "somesupersecretkeymadebyadmin",
        { expiresIn: "1h" }
      );
      res
        .status(201)
        .json({
          token: token,
          userId: loadeduser._id.toString(),
          name: loadeduser.name,
          message:'User Logged in successfully!'
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
