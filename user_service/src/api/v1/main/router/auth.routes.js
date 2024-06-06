const AuthenticationController = require("../controller/authentication.controller");
const AccountMiddleware = require("../middleware/acc.middleware");
const RequestMiddleWare = require("../middleware/req.middleware");
const UserMiddleWare = require("../middleware/user.middleware");

const router = require("express").Router();

router.post("/gen-user-token", UserMiddleWare.login, AuthenticationController.GenUserToken);
router.post("/gen-account-token", AccountMiddleware.login, AuthenticationController.GenAccToken);
router.post("/decode-token", RequestMiddleWare.GetBearerToken, AuthenticationController.DecodeToken);

class AuthenticationRouter {
  static router = router;
}

module.exports = AuthenticationRouter;
