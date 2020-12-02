const { Book, Author, AuthorBook } = require("../../models");
const responseSuccess = "Response Success";

//Book HasMany Author
exports.getBoooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Author,
        as: "authors",
        attributes: {
          exclude: ["createdAt", "updatedAt", "AuthorBooks"],
        },
      },
    });

    res.send({
      status: responseSuccess,
      message: `Books sucessfully loaded`,
      data: {
        books,
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

exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Book,
        as: "books",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: responseSuccess,
      message: `Authors sucessfully loaded`,
      data: {
        authors,
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
