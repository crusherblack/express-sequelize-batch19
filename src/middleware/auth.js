const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  //initialisasi header dan token variable
  let header, token;

  //cek jika header ada
  //cek jika token ada
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    //jika header atau token tidak valid maka kirim response access denied
    return res.status(401).send({
      status: "Response fail",
      error: {
        message: "Access Denied",
      },
    });
  }

  //jika header token ada
  try {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    //lakukan verify token oleh jsonwebtoken
    const verified = jwt.verify(token, privateKey);

    //tambahkan request user sehingga bisa diakses di next function, middleware, etc
    req.user = verified;

    //lanjut ke berikutnya
    next();
  } catch (err) {
    //jika proses verify gagal maka kirim response invalid token
    return res.status(401).send({
      status: "Response fail",
      error: {
        message: "Invalid Token",
      },
    });
  }
};
