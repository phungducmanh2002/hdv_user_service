const express = require("express");

const DataResponse = require("../data/data.respone");
const UserService = require("../service/user.service");
const RoleEnum = require("../../enum/role.enum");

class UserController {
  static Create = [
    (req, res, next) => {
      const username = req.reqData.username;
      const idAccount = req.reqData.idAccount;
      const idRole = req.reqData.idRole;

      if (!username || !idAccount || !idRole) {
        res.json(DataResponse.BadRequest("please provide infomation"));
        return;
      }

      UserService.CreateUser(idAccount, username, idRole)
        .then((user) => {
          res.json(DataResponse.Oke(user, "create success"));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static Update = [];
  static Delete = [];
  static Get = [
    (req, res, next) => {
      const id = req.reqData.id;
      const pageNum = req.query?.pageNum;

      // get all
      if (!id) {
        UserService.GetAll(pageNum)
          .then((users) => {
            res.json(DataResponse.Oke(users));
          })
          .catch((err) => {
            res.json(DataResponse.Clone(err));
          });
        return;
      }

      // get by id
      UserService.Get(id)
        .then((user) => {
          res.json(DataResponse.Oke(user));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static GetByUsername = [
    (req, res, next) => {
      const username = req.params?.username;
      if (!username) {
        res.json(DataResponse.BadRequest("please provide username"));
        return;
      }

      UserService.GetByUsername(username)
        .then((user) => {
          res.json(DataResponse.Oke(user));
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err, err.message));
        });
    },
  ];
  static GetByIdAccount = [
    (req, res, next) => {
      const id = req.reqData.id;

      // get by id
      UserService.GetByIdAccount(id)
        .then((users) => {
          res.json(DataResponse.Oke(users));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
}
module.exports = UserController;
