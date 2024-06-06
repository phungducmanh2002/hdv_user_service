const DataResponse = require("../data/data.respone");
const AccountService = require("../service/account.service");
const RequestMiddleWare = require("./req.middleware");

class AccountMiddleware {
  static login = [
    ...RequestMiddleWare.ParseReqBody,
    (req, res, next) => {
      const email = req.body?.email;
      const password = req.body?.password;

      if (!email || !password) {
        res.json(DataResponse.BadRequest("please provide email and password"));
        return;
      }

      AccountService.GetAccountByEmailPassword(email, password)
        .then((account) => {
          if (!account) {
            res.json(DataResponse.BadRequest("account does not exists"));
            return;
          }
          req.reqData.idAccount = account.id;
          next();
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];

  static getReqAccount = [
    ...RequestMiddleWare.ParseReqBody,
    (req, res, next) => {
      const { email, password, firstName, lastName, gender, birthDay } = req.body;
      req.reqData.email = email;
      req.reqData.password = password;
      req.reqData.firstName = firstName;
      req.reqData.lastName = lastName;
      req.reqData.gender = gender;
      req.reqData.birthDay = birthDay;
      next();
    },
  ];
}

module.exports = AccountMiddleware;
