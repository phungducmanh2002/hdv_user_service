const RoleController = require("../controller/role.controller");
const RequestMiddleWare = require("../middleware/req.middleware");

const router = require("express").Router();

router.post("", RoleController.Create);
router.get("/:id", RequestMiddleWare.CheckID, RoleController.Get);
router.get("", RoleController.Get);

class RoleRouter {
  static router = router;
}

module.exports = RoleRouter;
