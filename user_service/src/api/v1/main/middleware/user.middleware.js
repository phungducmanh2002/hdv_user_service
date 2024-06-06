const DataResponse = require("../data/data.respone");
const AccountService = require("../service/account.service");
const UserService = require("../service/user.service");
const AccountMiddleware = require("./acc.middleware");
const RequestMiddleWare = require("./req.middleware");

class UserMiddleWare {
  static login = [
    ...AccountMiddleware.login,
    (req, res, next) => {
      const idAccount = req.reqData?.idAccount;
      const idRole = req.body?.idRole;

      if (!idRole) {
        res.json(DataResponse.BadRequest("please provide id role"));
        return;
      }

      if (!idAccount) {
        res.json(DataResponse.ServerError("no id account provided"));
        return;
      }

      UserService.GetUserByIdAccountIdRole(idAccount, idRole)
        .then((user) => {
          if (!user) {
            res.json(DataResponse.BadRequest("user does not exists"));
            return;
          }
          req.reqData.idUser = user.id;
          next();
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];

  static getReqUser = [
    ...RequestMiddleWare.ParseReqBody,
    (req, res, next) => {
      const { username, idAccount, idRole } = req.body;
      req.reqData.username = username;
      req.reqData.idAccount = idAccount;
      req.reqData.idRole = idRole;
      next();
    },
  ];
}

module.exports = UserMiddleWare;
