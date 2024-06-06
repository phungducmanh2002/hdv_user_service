const NumberStringHelper = require("../../helper/number.string.helper");
const AccountEntity = require("../data/model/entity/account.entity");
const UserEntity = require("../data/model/entity/user.entity");

class AccountService {
  static async GetAll(pageNum, pageSize = 10) {
    const offset = (pageNum - 1) * pageSize;
    return await AccountEntity.findAll({
      limit: pageSize,
      offset: offset,
    });
  }
  static async GetAllUsers(idAccount) {
    return await UserEntity.findAll({ where: { idAccount: idAccount } });
  }
  static async GetByEmail(email) {
    return await AccountEntity.findOne({ where: { email: email } });
  }
  static async FindAccountById(idAccount) {
    return await AccountEntity.findByPk(idAccount);
  }
  static async GenerateAccountCode(type, email) {
    return new Promise((resolve, reject) => {
      AccountService.GetByEmail(email)
        .then((account) => {
          if (!account) {
            const defErr = {
              code: 400,
              message: `not found account with email: ${email}`,
            };
            reject(defErr);
          } else {
            const randomCode = NumberStringHelper.GenerateNumericString(5);
            const code = `${type}${randomCode}`;

            account.accountCode = code;
            account
              .save({ fields: ["accountCode"] })
              .then((account) => {
                resolve({
                  account: account,
                  code: code,
                });
              })
              .catch((err) => {
                reject({ code: 500, message: err.message });
              });
          }
        })
        .catch((err) => {
          reject({ code: 500, message: err.message });
        });
    });
  }
  static async ActiveAccount(email, typedCode) {
    return new Promise((resolve, reject) => {
      AccountService.GetByEmail(email)
        .then((account) => {
          if (!account) {
            const defErr = {
              code: 400,
              message: `not found account with email: ${email}`,
            };
            reject(defErr);
          } else {
            if (account.isValidCode(typedCode)) {
              account
                .update({
                  accountStatus: 1,
                  accountCode: null,
                })
                .then((account) => {
                  resolve(account);
                })
                .catch((err) => {
                  const defErr = {
                    code: 500,
                    message: err.message,
                    data: err,
                  };
                  reject(defErr);
                });
            } else {
              const defErr = {
                code: 400,
                message: `code is not valid`,
              };
              reject(defErr);
            }
          }
        })
        .catch((err) => {
          reject({ code: 500, message: err.message, data: err });
        });
    });
  }
  static async CreateAccount(email, password, firstName, lastName, gender, birthDay) {
    const newAccount = AccountEntity.build({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      birthDay: birthDay,
      accountStatus: 0,
      accountCode: null,
    });

    return new Promise((resolve, reject) => {
      newAccount
        .save()
        .then((account) => {
          resolve(account);
        })
        .catch((err) => {
          reject({ code: 500, message: err.message });
        });
    });
  }
  static async UpdateAccount(idAccount, firstName, lastName, gender, birthDay) {
    const updateValues = {};
    if (firstName != null) {
      updateValues.firstName = firstName;
    }
    if (lastName != null) {
      updateValues.lastName = lastName;
    }
    if (gender != null) {
      updateValues.gender = gender;
    }
    if (birthDay != null) {
      updateValues.birthDay = birthDay;
    }

    return new Promise((resolve, reject) => {
      AccountEntity.findByPk(idAccount)
        .then((account) => {
          if (!account) {
            const defErr = {
              code: 400,
              message: "id account not matched",
            };
            reject(defErr);
          } else {
            account
              .update(updateValues)
              .then((accountUpdated) => {
                resolve(accountUpdated);
              })
              .catch((err) => {
                const defErr = {
                  code: 500,
                  message: err.message,
                  data: err,
                };
                reject(defErr);
              });
          }
        })
        .catch((err) => {
          const defErr = {
            code: 500,
            message: err.message,
            data: err,
          };
          reject(defErr);
        });
    });
  }
  static async GetAccountByEmailPassword(email, password) {
    return new Promise((resolve, reject) => {
      AccountService.GetByEmail(email)
        .then((account) => {
          if (!account) {
            const defErr = {
              code: 400,
              message: "invalid email",
            };
            reject(defErr);
          } else {
            if (account.isValidPassword(password)) {
              resolve(account);
            } else {
              const defErr = {
                code: 403,
                message: "invalid password",
              };
              reject(defErr);
            }
          }
        })
        .catch((err) => {
          const defErr = {
            code: 500,
            message: err.message,
            data: err,
          };
          reject(defErr);
        });
    });
  }
}

module.exports = AccountService;
