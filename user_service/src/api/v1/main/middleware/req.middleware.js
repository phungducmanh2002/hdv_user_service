const DataResponse = require("../data/data.respone");
const express = require("express");

class RequestMiddleWare {
  static ParseReqBody = [express.urlencoded({ extended: false }), express.json()];

  static CheckID = [
    (req, res, next) => {
      const id = parseInt(req.params?.id);
      if (!id) {
        res.json(DataResponse.BadRequest("please provide id"));
        return;
      }
      req.reqData.id = id;
      next();
    },
  ];

  static GetBearerToken = [
    (req, res, next) => {
      const bearerToken = req.headers?.authorization;
      const accessToken = bearerToken?.slice(7);
      if (!accessToken) {
        res.json(DataResponse.Forbidden({}, "please provide access token (bearer token)"));
        return;
      }
      req.reqData.token = accessToken;
      next();
    },
  ];
}

module.exports = RequestMiddleWare;
