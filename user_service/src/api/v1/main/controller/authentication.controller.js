const DataResponse = require("../data/data.respone");
const jwt = require("jsonwebtoken");

const express = require("express");
const AuthenticationService = require("../service/authentication.service");
const UserService = require("../service/user.service");
const AccountService = require("../service/account.service");

class AuthenticationController {
  static GenAccToken = [
    (req, res, next) => {
      const token = AuthenticationService.GenerateAccountToken(req.reqData.idAccount);
      if (!token) {
        res.json(DataResponse.ServerError({}, "un know error"));
        return;
      }
      res.json(DataResponse.Oke({ accessToken: token }, "generate access token success"));
    },
  ];
  static GenUserToken = [
    (req, res, next) => {
      const token = AuthenticationService.GenerateAccessToken(req.reqData.idUser);
      if (!token) {
        res.json(DataResponse.ServerError({}, "un know error"));
        return;
      }
      res.json(DataResponse.Oke({ accessToken: token }, "generate access token success"));
    },
  ];
  static DecodeToken = [
    (req, res, next) => {
      const decodeToken = jwt.decode(req.reqData.token);
      if (!decodeToken) {
        res.json(DataResponse.BadRequest("access token not valid"));
        return;
      }
      res.json(DataResponse.Oke(decodeToken, "decode token successfully"));

      next();
    },
  ];
}

module.exports = AuthenticationController;
