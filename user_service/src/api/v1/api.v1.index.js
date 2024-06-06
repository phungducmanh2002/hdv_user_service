const express = require("express");
const IndexRouter = require("./main/router/index.routes");
const EntityIndex = require("./main/data/model/entity/index.entity");
const ProjectHelper = require("./helper/project.helper");
const app = express();

app.use((req, res, next) => {
  req.reqData = {};
  next();
}, IndexRouter.router);

EntityIndex.DoAction();

class ApiV1Server {
  static server = app;
}

module.exports = ApiV1Server;
