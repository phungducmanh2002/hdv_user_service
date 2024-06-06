const AccountController = require("../controller/account.controller");
const AccountMiddleware = require("../middleware/acc.middleware");
const RequestMiddleWare = require("../middleware/req.middleware");

const router = require("express").Router();

router.get("/:id", RequestMiddleWare.CheckID, AccountController.Get);
router.get("/email/:email", AccountController.GetByEmail);
router.get(
  "/:id/users",
  RequestMiddleWare.CheckID,
  AccountController.GetAllUsers
);
router.post(
  "/send-code",
  RequestMiddleWare.ParseReqBody,
  AccountController.SendCode
);
router.put("/active", AccountController.Active);
router.delete("/:id", RequestMiddleWare.CheckID, AccountController.Delete);

router.put("", AccountMiddleware.getReqAccount, AccountController.Update);
router.post("", AccountMiddleware.getReqAccount, AccountController.Create);
router.get("", AccountController.Get);

class AccountRouter {
  static router = router;
}

module.exports = AccountRouter;
