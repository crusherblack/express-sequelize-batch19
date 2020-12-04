const { User } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const responseSuccess = "Response Success";

exports.register = async (req, res) => {
  try {
    //validasi input yang masuk dari req.body
    const { body } = req;

    //validasi body ketika login
    const schema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().min(10).required(),
      password: Joi.string().min(8).required(),
    });

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

    //cek email terdaftar atau tidak di system
    const checkEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });

    //jika sudah maka throw response email already existed
    if (checkEmail) {
      return res.status(400).send({
        status: "Failed",
        message: `Email already exsited`,
      });
    }

    //desctruct object
    const { name, email, password } = body;

    //encrypt password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //private key
    const privateKey = process.env.JWT_PRIVATE_KEY;
    //proses pembuatan token menggunakan jsonwebstoken
    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey
    );

    //send response berserta token
    res.send({
      status: responseSuccess,
      message: "You succesfully registered",
      data: {
        name: user.name,
        email: user.email,
        token,
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

exports.login = async (req, res) => {
  try {
    const { body } = req;

    //validasi login
    const schema = Joi.object({
      email: Joi.string().email().min(10).required(),
      password: Joi.string().min(8).required(),
    });

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

    const { email, password } = req.body;

    //cek apakah email terdaftar
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //jika tidak terdaftar makan invalid login
    if (!user) {
      return res.status(400).send({
        status: "Login Fail",
        error: {
          message: "Invalid Login",
        },
      });
    }

    //melakukan comparasi terhadapat password yang diinput oleh user
    //dengan password yang ada di database
    const validPass = await bcrypt.compare(password, user.password);

    //jika password gak valid maka bilang invalid login
    if (!validPass) {
      return res.status(400).send({
        status: "Login Fail",
        error: {
          message: "Invalid Login",
        },
      });
    }

    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey
    );

    //response login dengan token
    res.send({
      status: responseSuccess,
      message: "Login Success",
      data: {
        name: user.name,
        email: user.email,
        token,
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
