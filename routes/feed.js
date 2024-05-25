const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

const feedController = require("../controllers/feed");

router.get("/posts", isAuth, feedController.getFeeds);

router.get("/posts/:postId", isAuth, feedController.getPost);

router.put(
  "/posts/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updateBlog
);

router.delete("/posts/:postId", isAuth, feedController.deletePost);

router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

module.exports = router;
