const RoleEntity = require("../data/model/entity/role.entity");

class RoleService {
  static async Create() {}
  static async GetAll() {
    return await RoleEntity.findAll();
  }
  static async Get(id) {
    return await RoleEntity.findByPk(id);
  }
}

module.exports = RoleService;
