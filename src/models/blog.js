const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema(
  {
    title: {
      type: String,
      required: true, // wajib ada title
    },

    body: {
      type: String,
      required: true, // wajib ada body
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true, // wajib ada author
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", BlogPost);
