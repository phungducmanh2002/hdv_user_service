const { sequelize } = require("../../config/sequelize.config");
const UserEntity = require("../data/model/entity/user.entity");

class UserService {
  static async GetByUsername(username) {
    return await UserEntity.findOne({ where: { username: username } });
  }

  static async Get(id) {
    return await UserEntity.findByPk(id);
  }

  static async GetByIdAccount(idAccount) {
    return await UserEntity.findAll({ where: { idAccount: idAccount } });
  }

  static async GetAll(pageNum, pageSize = 10) {
    const offset = (pageNum - 1) * pageSize;
    return await UserEntity.findAll({
      limit: pageSize,
      offset: offset,
    });
  }

  static async FindUserById(idUser) {
    return await UserEntity.findByPk(idUser);
  }
  static async CreateUser(idAccount, username, idRole) {
    return new Promise(async (resolve, reject) => {
      const transaction = await sequelize.transaction();

      try {
        const newUser = await UserEntity.create(
          {
            idAccount: idAccount,
            idRole: idRole,
            username: username,
            idAvatar: null,
            userStatus: 1,
          },
          { transaction: transaction }
        );

        if (!newUser) {
          throw new Error("unknow error");
        } else {
          resolve(newUser);
        }

        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        const defErr = {
          code: 500,
          message: err.message,
          data: err,
        };
        reject(defErr);
      }
    });
  }
  static async GetUserByIdAccountIdRole(idAccount, idRole) {
    return await UserEntity.findOne({
      where: {
        idAccount: idAccount,
        idRole: idRole,
      },
    });
  }
}

module.exports = UserService;
