const DataResponse = require("../data/data.respone");
const RoleService = require("../service/role.service");

class RoleController {
  static Create = [
    (req, res, next) => {
      res.json(DataResponse.Oke({}, "create role"));
    },
  ];
  static Get = [
    (req, res, next) => {
      const id = req.reqData.id;
      if (!id) {
        RoleService.GetAll()
          .then((roles) => {
            res.json(DataResponse.Oke(roles));
          })
          .catch((err) => {
            res.json(DataResponse.ServerError());
          });
      } else {
        RoleService.Get(id)
          .then((role) => {
            res.json(DataResponse.Oke(role));
          })
          .catch((err) => {
            res.json(DataResponse.ServerError());
          });
      }
    },
  ];
}
module.exports = RoleController;
