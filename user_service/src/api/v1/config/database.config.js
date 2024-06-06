const ProjectHelper = require("../helper/project.helper");

const database = ProjectHelper.getEnviromentValue("DB_DBNAME");
const username = ProjectHelper.getEnviromentValue("DB_USERNAME");
const password = ProjectHelper.getEnviromentValue("DB_PASSWORD");

const host = ProjectHelper.getEnviromentValue("DB_HOST");
const port = ProjectHelper.getEnviromentValue("DB_PORT");
const dialect = ProjectHelper.getEnviromentValue("DB_DIALECT");

class DatabaseConfig {
  static config = {
    host: host,
    port: port,
    user: username,
    password: password,
    database: database,
    dialect: dialect,
  };
}

module.exports = DatabaseConfig;
