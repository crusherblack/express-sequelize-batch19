"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true, //Paranoid model to active soft delete
      modelName: "Post", //nama table didatabase
    }
  );

  return Post;
};
