const SequelizeConfig = require("../../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const NumberStringHelper = require("../../../../helper/number.string.helper");

class AccountEntity extends Model {
  isValidPassword(password) {
    return NumberStringHelper.CompareStringAndHash(
      password,
      this.getDataValue("password")
    );
  }

  isValidCode(code) {
    if (this.getDataValue("accountCode") == null) {
      return false;
    }
    return NumberStringHelper.CompareStringAndHash(
      code,
      this.getDataValue("accountCode")
    );
  }
}

AccountEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        /**Nam, Nu, Khac */
        isIn: [[0, 1, 2]],
      },
    },
    birthDay: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        const hash = NumberStringHelper.HashString(password);
        this.setDataValue("password", hash);
      },
      get(password) {
        return "*******";
      },
    },
    accountStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1, 2]],
        /**Chua kich hoat, kich hoat, khoa */
      },
    },
    accountCode: {
      type: DataTypes.STRING,
      allowNull: true,
      set(code) {
        if (code != null) {
          const hash = NumberStringHelper.HashString(code);
          this.setDataValue("accountCode", hash);
        }
      },
      get(code) {
        return code;
      },
    },
  },
  {
    sequelize: SequelizeConfig.sequelize,
    freezeTableName: true,
    tableName: "account",
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = AccountEntity;
