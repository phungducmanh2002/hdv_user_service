const ProjectHelper = require("../helper/project.helper");

const secret = ProjectHelper.getEnviromentValue("JWT_SECRET");
const algorithm = ProjectHelper.getEnviromentValue("JWT_ALGORITH");
const tokenLifeTime = ProjectHelper.getEnviromentValue("JWT_LIFE_TIME");

class JwtConfig {
  static secret = secret;
  static options = {
    algorithm: algorithm,
    allowInsecureKeySizes: true,
    expiresIn: tokenLifeTime,
  };
}

module.exports = JwtConfig;
