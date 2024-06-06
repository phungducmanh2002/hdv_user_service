const express = require("express");
const jwt = require("jsonwebtoken");

const DataResponse = require("../data/data.respone");
const AccountService = require("../service/account.service");

class AccountController {
  static Create = [
    (req, res, next) => {
      if (!req.reqData.email || !req.reqData.password) {
        res.json(DataResponse.BadRequest("invalid email and password"));
        return;
      }
      if (req.reqData.birthDay) {
        req.reqData.birthDay = new Date(req.reqData.birthDay);
      }
      next();
    },
    /**STEP2: CREATE ACCOUNT */
    (req, res, next) => {
      AccountService.CreateAccount(
        req.reqData.email,
        req.reqData.password,
        req.reqData.firstName,
        req.reqData.lastName,
        req.reqData.gender ? req.reqData.gender : 0,
        req.reqData.birthDay
      )
        .then((account) => {
          res.json(DataResponse.Created(account, "create account success"));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static Update = [
    (req, res, next) => {
      AccountService.UpdateAccount(
        req.reqData.idAccount,
        req.reqData.firstName,
        req.reqData.lastName,
        req.reqData.gender,
        req.reqData.birthDay
      )
        .then((account) => {
          res.json(DataResponse.Oke(account, "update account success"));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static Get = [
    (req, res, next) => {
      const id = req.reqData?.id;
      const pageNum = req.query?.pageNum;

      // get all
      if (!id) {
        AccountService.GetAll(pageNum)
          .then((accounts) => {
            res.json(DataResponse.Oke(accounts));
          })
          .catch((err) => {
            res.json(DataResponse.Clone(err));
          });
        return;
      }

      // get by id
      AccountService.FindAccountById(id)
        .then((account) => {
          res.json(DataResponse.Oke(account));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static GetByEmail = [
    (req, res, next) => {
      const email = req.params?.email;
      if (!email) {
        res.json(DataResponse.BadRequest("please provide email"));
        return;
      }

      AccountService.GetByEmail(email)
        .then((account) => {
          if (!account) {
            res.json(
              DataResponse.Notfound(`not found account by email: ${email}`)
            );
            return;
          }
          res.json(DataResponse.Oke(account));
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err.message, err));
        });
    },
  ];
  static GetAllUsers = [
    (req, res, next) => {
      const id = req.reqData.id;
      AccountService.GetAllUsers(id)
        .then((users) => {
          res.json(DataResponse.Oke(users));
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err, err.message));
        });
    },
  ];
  static Delete = [
    (req, res, next) => {
      res.json(DataResponse.NoContent("chức năng đang phát triển"));
    },
  ];

  static SendCode = [
    /**STEP1: CHECK REQUEST */
    (req, res, next) => {
      const email = req.body?.email;
      const type = req.body?.type;
      if (!email) {
        res.json(DataResponse.BadRequest("please provide email"));
        return;
      }
      req.reqData.email = email;
      req.reqData.type = type;
      next();
    },
    /**STEP2: SEND ACTIVE CODE */
    (req, res, next) => {
      AccountService.GenerateAccountCode(req.reqData.type, req.reqData.email)
        .then(({ account, code }) => {
          res.json(DataResponse.Oke({ code: code, idAccount: account.id }));
        })
        .catch((err) => {
          res.json(new DataResponse(...err));
        });
    },
  ];
  static Active = [
    (req, res, next) => {
      const { email, code } = req.body;
      if (!email || !code) {
        res.json(DataResponse.BadRequest("please provide email and code"));
        return;
      }

      req.reqData.email = email;
      req.reqData.code = code;
      next();
    },
    /**STEP2: ACTIVE */
    (req, res, next) => {
      AccountService.ActiveAccount(req.reqData.email, req.reqData.code)
        .then((account) => {
          res.json(DataResponse.Oke(account, "active account success"));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
}

module.exports = AccountController;
