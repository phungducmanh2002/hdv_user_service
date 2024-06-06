const http = require("http");
const v1 = require("./api/v1/api.v1.index");
const ProjectHelper = require("./api/v1/helper/project.helper");
const ServiceRegistry = require("./api/v1/axios/service.registry");

const ip = ProjectHelper.getEnviromentValue("SERVICE_IP");
const port = ProjectHelper.getEnviromentValue("SERVICE_PORT");

const serviceInfo = {
  id: "userservice",
  name: "user service",
  ip: ProjectHelper.getEnviromentValue("SERVICE_IP"),
  port: ProjectHelper.getEnviromentValue("SERVICE_PORT"),
  url: `http://${ip}:${port}`,
};

const start = () => {
  if (ProjectHelper.getEnviromentValue("REGISTRY_REGISTER") == 0) {
    http.createServer(v1.server).listen(ProjectHelper.getEnviromentValue("SERVICE_PORT"), async () => {
      console.log(`
      _____________________________________
      
      USER SERVICE STARTED
        - HOST: ${ProjectHelper.getEnviromentValue("SERVICE_IP")}        
        - PORT: ${ProjectHelper.getEnviromentValue("SERVICE_PORT")}     
  
        // DATABASE //
          + HOST: ${ProjectHelper.getEnviromentValue("DB_HOST")} 
          + PORT: ${ProjectHelper.getEnviromentValue("DB_PORT")} 
          + DIALECT: ${ProjectHelper.getEnviromentValue("DB_DIALECT")} 
          + DATABASE: ${ProjectHelper.getEnviromentValue("DB_DBNAME")} 
          + USERNAME: ${ProjectHelper.getEnviromentValue("DB_USERNAME")} 
          + PASSWORD: ${ProjectHelper.getEnviromentValue("DB_PASSWORD")} 
      _____________________________________
    `);
    });
  } else {
    ServiceRegistry.registerService(
      serviceInfo,
      () => {
        http.createServer(v1.server).listen(ProjectHelper.getEnviromentValue("SERVICE_PORT"), async () => {
          console.log(`
          _____________________________________
          
          USER SERVICE STARTED
            - HOST: ${ProjectHelper.getEnviromentValue("SERVICE_IP")}        
            - PORT: ${ProjectHelper.getEnviromentValue("SERVICE_PORT")}     
      
            // DATABASE //
              + HOST: ${ProjectHelper.getEnviromentValue("DB_HOST")} 
              + PORT: ${ProjectHelper.getEnviromentValue("DB_PORT")} 
              + DIALECT: ${ProjectHelper.getEnviromentValue("DB_DIALECT")} 
              + DATABASE: ${ProjectHelper.getEnviromentValue("DB_DBNAME")} 
              + USERNAME: ${ProjectHelper.getEnviromentValue("DB_USERNAME")} 
              + PASSWORD: ${ProjectHelper.getEnviromentValue("DB_PASSWORD")} 
          _____________________________________
        `);
        });
      },
      () => {
        console.log("register service failed");
        setTimeout(() => {
          start();
        }, 2000);
      }
    );
  }
};

start();
