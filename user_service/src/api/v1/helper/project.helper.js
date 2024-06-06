require("dotenv").config();

class ProjectHelper {
  static getEnviromentValue(key) {
    return process.env?.[key];
  }
}

module.exports = ProjectHelper;
