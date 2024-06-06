const SequelizeConfig = require("../../../../config/sequelize.config");
const ProjectHelper = require("../../../../helper/project.helper");
const AccountEntity = require("./account.entity");
const RoleEntity = require("./role.entity");
const UserEntity = require("./user.entity");

AccountEntity.hasMany(UserEntity, {
  foreignKey: "idAccount",
});
UserEntity.belongsTo(AccountEntity, {
  foreignKey: "idAccount",
});

RoleEntity.hasMany(UserEntity, { foreignKey: "idRole" });
UserEntity.belongsTo(RoleEntity, { foreignKey: "idRole" });

class EntityIndex {
  static async DoAction() {
    if (ProjectHelper.getEnviromentValue("GENERATE_DB") == 1) {
      await SequelizeConfig.sequelize.sync({ force: true });
    }
    if (ProjectHelper.getEnviromentValue("GENERATE_DATA") == 1) {
      try {
        await RoleEntity.bulkCreate([
          {
            roleName: "ADMIN",
          },
          {
            roleName: "HOTELIER",
          },
          {
            roleName: "CUSTOMER",
          },
        ]);
      } catch (error) {}
    }
  }
}

module.exports = EntityIndex;
