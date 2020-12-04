const isLogin = false;

exports.auth = (req, res, next) => {
  //teruskan ke function berikutnya / middleware berikutnya
  if (isLogin) next();
  else {
    //hentikan request lifycycle disini
    res.send({
      message: "You ar Unauthenticated",
    });
  }
};
