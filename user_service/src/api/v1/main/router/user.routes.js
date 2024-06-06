const RoleEnum = require("../../enum/role.enum");
const UploadFileHelper = require("../../helper/upload.helper");
const UserController = require("../controller/user.controller");
const RequestMiddleWare = require("../middleware/req.middleware");
const UserMiddleWare = require("../middleware/user.middleware");

const router = require("express").Router();

router.get("/:id", RequestMiddleWare.CheckID, UserController.Get);
router.get("/check-exists/:username", UserController.GetByUsername);
// router.put("/:id", RequestMiddleWare.CheckID, UserController.Update);
// router.delete("/:id", RequestMiddleWare.CheckID, UserController.Delete);
router.post("/hotelier", UserMiddleWare.getReqUser, UserController.Create);

router.get("/", UserController.Get);
router.post("/", UserMiddleWare.getReqUser, UserController.Create);

class RoleRouter {
  static router = router;
}

module.exports = RoleRouter;
