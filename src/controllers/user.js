const { User, Profile, Skill } = require("../../models");
const responseSuccess = "Response Success";

//User HasOne Profile
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Profile,
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt", "UserId"],
          },
        },
        {
          model: Skill,
          as: "skills",
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt", "UserId"],
          },
        },
      ],
    });

    res.send({
      status: responseSuccess,
      message: "Users successfully get",
      data: {
        users,
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
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt", "UserId"],
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: responseSuccess,
      message: "Profiles successfully get",
      data: {
        profiles,
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
