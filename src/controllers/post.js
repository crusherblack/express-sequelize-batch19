//import model Post
const { Post } = require("../../models");
const responseSuccess = "Response Success";
const resourceNotFound = "Resource Not Found";
const Joi = require("joi");

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
//Mendapatkan seluruh resource dari table post
exports.getPosts = async (req, res) => {
  console.log("request dari middleware", req.user.id);

  try {
    //tampung data yang diresolve dari promise findAll (model Post)
    const posts = await Post.findAll({
      //meng-hide spesific field pada table
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    //cek jika array yang direturn dari findAll panjangnya 0
    //maka kita kasih tahu bawah post gak ada
    //code berhenti disini jika kondisi terpenuhi
    if (posts.length === 0) {
      return res.status(400).send({
        status: resourceNotFound,
        message: "Posts empty",
        data: {
          posts: [],
        },
      });
    }

    //jika data ada maka kirim response ke client
    res.send({
      status: responseSuccess,
      message: "Posts successfully get",
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
    //response error jika ada kesalahan di sisi server
    //bisa jadi karena typo / salah coding atau masalah koneksi ke database
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

//Get 1 resource dari table post
exports.getSinglePostById = async (req, res) => {
  try {
    //get object id dari paramater yang dikirim client
    //pastikan nama object yang didestruct sama dengan yang kita definisikan pada router
    const { id } = req.params;

    //findOne pasti retrun null atau 1 object
    const post = await Post.findOne({
      where: {
        id,
      },
    });

    //cek jika post null maka code eksekusi sampe sini saja
    if (!post) {
      return res.status(400).send({
        status: resourceNotFound,
        message: `Post with id: ${id} not found`,
        data: {
          post: null,
        },
      });
    }

    //jika enggak null maka kirim response yang ditemukan
    res.send({
      status: responseSuccess,
      message: "Post succesfully get",
      data: {
        post,
      },
    });
  } catch (err) {
    //error here
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

//Menambahkan 1 resource pada table post
exports.addPost = async (req, res) => {
  try {
    //body merupakan data yang kita peroleh dari client
    //body ada pada request
    //files = array of object / hanya didapat jika melewati upload middleware
    const { body, files } = req;

    //how to get file yang diupload
    const thumbnailName = files.thumbnail[0].filename;
    const videoFileName = files.videoFile[0].filename;

    console.log({ videoFileName, thumbnailName });

    //bikin schema dan tentunkan rule dari validasi kita
    const schema = Joi.object({
      title: Joi.string().min(5).required(),
      description: Joi.string().min(10).required(),
      content: Joi.string(),
    });

    //destruct error result dari validation
    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    //jika ada error stop disini dan kirim response error
    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    //method create menerima 1 parameter yaitu data yang mau diinsert
    const post = await Post.create({ ...body, thumbnail: thumbnailName });

    //send jika oke
    res.send({
      status: responseSuccess,
      message: "Post successfully created",
      data: {
        post,
      },
    });
  } catch (err) {
    //error here
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

//melakukan operasi update pada spesifik resource pada table post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    //method FindOne menerima object yaitu where : {id}
    const getPostById = await Post.findOne({
      where: {
        id,
      },
    });

    //jika datanya gak ada ya gak bisa update dong
    if (!getPostById) {
      return res.status(400).send({
        status: resourceNotFound,
        message: `Post with id: ${id} not found`,
        data: {
          post: null,
        },
      });
    }

    //update menerima 2 parameter yaitu data yang mau diupdate dan where id
    const post = await Post.update(body, {
      where: {
        id,
      },
    });

    //karena yang direturn setelah update cuma id doang
    //maka kita harus get lagi sebelum dikirim ke sisi client
    const getPostAfterUpdate = await Post.findOne({
      where: {
        id,
      },
    });

    //hasil update
    res.send({
      status: responseSuccess,
      message: "Post successfully created",
      data: {
        post: getPostAfterUpdate,
      },
    });
  } catch (err) {
    //error here
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

//menghapus spesific resource dari table post
//note khusus untuk model Post kita tadi menghidupkan fitur Paranoid model
//cek model paranoid:true
//cek database kita tambah field baru yaitu deletedAt (wajib ada kalau pake paranoid model)
//apapun yang kita delete maka cuma terhapus sementara / Soft Delete
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const getPostById = await Post.findOne({
      where: {
        id,
      },
    });

    if (!getPostById) {
      return res.status(400).send({
        status: resourceNotFound,
        message: `Post with id: ${id} not found`,
        data: {
          post: null,
        },
      });
    }

    //hapus 1 resource by id
    await Post.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: responseSuccess,
      message: `Post with id: ${id} deleted`,
      data: {
        post: null,
      },
    });
  } catch (err) {
    //error here
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

//Karena kita aktifkan fitur paranoid model
//kita bisa akses method restore untuk mengembalikan resource yang sudah dihapus
exports.restorePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.restore({
      where: {
        id,
      },
    });

    //find post

    res.send({
      status: responseSuccess,
      message: `Post with id: ${id} successfully restored`,
      data: {
        post,
      },
    });
  } catch (err) {
    //error here
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

//function template
exports.function = async (req, res) => {
  try {
    //code here
  } catch (err) {
    //error here
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
