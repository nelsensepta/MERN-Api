const Auth = require("../models/Auth");

// POST Register
exports.register = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const Posting = new Auth({
    username: username,
    password: password,
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({ message: "Berhasil Register", data: result });
    })
    .catch((err) => console.log("err : " + err));
};

// GET Login
exports.login = (req, res, next) => {
  const id = req.params.id;
  Auth.findById(id)
    .then((result) => {
      if (!result) {
        const error = new Error("Password atau Username salah");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({ message: "Login Berhasil", data: result });
    })
    .catch((err) => next(err));
};
