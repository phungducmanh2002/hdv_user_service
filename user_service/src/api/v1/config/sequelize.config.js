const sequelize = require("sequelize");
const DatabaseConfig = require("./database.config");
const config = DatabaseConfig.config;

class SequelizeConfig {
  static sequelize = new sequelize(
    config.database,
    config.user,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      logging: false,
    }
  );
}

module.exports = SequelizeConfig;
