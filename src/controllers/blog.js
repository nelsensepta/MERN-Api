const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const path = require("path");
const fs = require("fs");

// POST Controller
exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus Diupload");
    err.errorStatus = 422;
    throw err;
  }

  // request
  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: "1",
      nama: "Kucir",
    },
  });

  Posting.save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Create Blog Post Success", data: result });
    })
    .catch((err) => console.log("err : " + err));
};

// GET all Blog Post Controller
exports.getAllBlogPost = (req, res, next) => {
  // ambil semua blog post menggunakan paginations
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;
  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Blog Post Berhasil Dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => next(err));

  // ambil semua blog tanpa pagination
  // BlogPost.find()
  //   .then((result) => {
  //     res
  //       .status(200)
  //       .json({ message: "Data Blog Post Berhasil Dipanggil", data: result });
  //   })
  //   .catch((err) => next(err));
};

// GET Blog Post By ID
exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog Post Tidak Ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Data Blog Post Berhasil Dipanggil", data: result });
    })
    .catch((err) => next(err));
};

// PUT Blog Post
exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus Diupload");
    err.errorStatus = 422;
    throw err;
  }

  // request
  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post Tidak Ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      post.title = title;
      post.body = body;
      post.image = image;
      return post.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Update Blog Post Berhasil", data: result });
    })
    .catch((err) => next(err));
};

// DELETE Blog Post
exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Blog Post Tidak Ditemukan");
        error.errorStatus = 404;
        throw error;
      }

      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Hapus Blog Post Berhasil", data: result });
    })
    .catch((err) => next(err));
};

// fungsi hapus image
const removeImage = (filePath) => {
  // console.log(filePath); // images\1621351186322-pantai1.jpg // filepath
  // console.log(__dirname);
  // E:/Esen/Web Development/MERN/MERN-Basic/mern-api/src/controllers // __dirname path

  filePath = path.join(__dirname, "../..", filePath);
  // E:/Esen/Web Development/MERN/MERN-Basic/mern-api/images/1621351186322-pantai1.jpg
  fs.unlink(filePath, (err) => console.log(err));
};
