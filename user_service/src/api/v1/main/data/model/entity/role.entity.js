const SequelizeConfig = require("../../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class RoleEntity extends Model {}

RoleEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeConfig.sequelize,
    freezeTableName: true,
    tableName: "role",
    indexes: [
      {
        unique: true,
        fields: ["roleName"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = RoleEntity;
