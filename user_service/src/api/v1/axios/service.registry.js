const { default: axios } = require("axios");
const ProjectHelper = require("../helper/project.helper");

class ServiceRegistry {
  static registerService(serviceInfo, onSuccess, onFailed) {
    const ip = ProjectHelper.getEnviromentValue("SERVICE_REGISTRY_IP");
    const port = ProjectHelper.getEnviromentValue("SERVICE_REGISTRY_PORT");
    const baseURL = `http://${ip}:${port}/services`;
    axios
      .post(baseURL, serviceInfo)
      .then((response) => {
        onSuccess(response);
      })
      .catch((err) => onFailed(err));
  }
}

module.exports = ServiceRegistry;
