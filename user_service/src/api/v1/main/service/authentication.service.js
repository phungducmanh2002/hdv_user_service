const JwtConfig = require("../../config/jwt.config");
const AccountService = require("./account.service");
const UserService = require("./user.service");
const jwt = require("jsonwebtoken");

class AuthenticationService {
  static async GetUserByEmailPasswordIdRole(email, password, idRole) {
    return new Promise((resolve, reject) => {
      // get account and compase password
      AccountService.GetAccountByEmailPassword(email, password)
        .then((account) => {
          // get user
          UserService.GetUserByIdAccountIdRole(account.id, idRole)
            .then((user) => {
              if (!user) {
                const defErr = {
                  code: 403,
                  message: "user does not exists",
                };
                reject(defErr);
              } else {
                resolve(user);
              }
            })
            .catch((err) => {
              const defErr = {
                code: 403,
                message: err.message,
                data: err,
              };
              reject(defErr);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static GenerateAccessToken(idUser) {
    try {
      const token = jwt.sign(
        { id: idUser },
        JwtConfig.secret,
        JwtConfig.options
      );
      return token;
    } catch (error) {
      return null;
    }
  }
  static GenerateAccountToken(idAccount) {
    try {
      const token = jwt.sign(
        { id: idAccount },
        JwtConfig.secret,
        JwtConfig.options
      );
      return token;
    } catch (error) {
      return null;
    }
  }
}

module.exports = AuthenticationService;
