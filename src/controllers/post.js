//import model Post
const { Post } = require("../../models");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    if (!posts) {
      return res.status(400).send({
        status: "Posts empty",
        data: [],
      });
    }

    res.send({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
