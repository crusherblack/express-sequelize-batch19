//import model Post
const { Post } = require("../../models");

//longWays
// exports.getPosts = async (req, res) => {
//   try {
//     const dataPost = await Post.findAll();

//     if (dataPost.length === 0) {
//       return res.status(400).send({
//         status: "Posts empty",
//         data: [],
//       });
//     }

//     res.send({
//       status: "success",
//       data: {
//         posts: dataPost,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({
//       error: {
//         message: "Server Error",
//       },
//     });
//   }
// };

//shortHand
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    if (posts.length === 0) {
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
