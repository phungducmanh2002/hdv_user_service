const SequelizeConfig = require("../../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class UserEntity extends Model {}

UserEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idAccount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1, 2]],
        /**Chua kich hoat, kich hoat, khoa */
      },
    },
  },
  {
    sequelize: SequelizeConfig.sequelize,
    freezeTableName: true,
    tableName: "user",
    indexes: [
      {
        unique: true,
        fields: ["idRole", "idAccount"],
      },
      {
        unique: true,
        fields: ["username"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = UserEntity;
