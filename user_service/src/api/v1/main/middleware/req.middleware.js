const DataResponse = require("../data/data.respone");
const express = require("express");

class RequestMiddleWare {
  static ParseReqBody = [
    express.urlencoded({ extended: false }),
    express.json(),
  ];

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
        res.json(
          DataResponse.Forbidden(
            {},
            "please provide access token (bearer token)"
          )
        );
        return;
      }
      req.reqData.token = accessToken;
      next();
    },
  ];

  static Cors = [
    (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // Cho phép truy cập từ bất kỳ domain nào
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Các phương thức được phép
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Các header được phép

      // Xử lý các yêu cầu preflight
      // if (req.method === 'OPTIONS') {
      //   return res.status(200).end();
      // }

      next();
    },
  ];
}

module.exports = RequestMiddleWare;
