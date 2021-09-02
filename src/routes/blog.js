const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const blogController = require("../controllers/blog");

// [POST] : /v1/blog/post // membuat blog baru
router.post(
  "/post",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Input title min 5 Karakter"),
    body("body")
      .isLength({ min: 10 })
      .withMessage("Input Body min 10 karakter "),
  ],
  blogController.createBlogPost
);

// [GET] : /v1/blog/posts  // ambil semua blog berdarkan pagination UI
router.get("/posts", blogController.getAllBlogPost);

// [GET] : /v1/blog/post/:postId // ambil blog berdasarkan id
router.get("/post/:postId", blogController.getBlogPostById);

// [PUT] : /v1/blog/post/:postId  // update blog berdasarkan id
router.put(
  "/post/:postId",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Input title min 5 Karakter"),
    body("body")
      .isLength({ min: 10 })
      .withMessage("Input Body min 10 karakter "),
  ],
  blogController.updateBlogPost
);

// [DELETE] /v1/blog/post/:postId // delete blog berdasarkan id
router.delete("/post/:postId", blogController.deleteBlogPost);

module.exports = router;
