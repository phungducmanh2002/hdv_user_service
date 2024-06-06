const AccountRouter = require("./account.routes");
const AuthenticationRouter = require("./auth.routes");
const RoleRouter = require("./role.routes");
const UserRouter = require("./user.routes");

const router = require("express").Router();

router.use("/accounts", AccountRouter.router);
router.use("/users", UserRouter.router);
router.use("/roles", RoleRouter.router);
router.use("/auth", AuthenticationRouter.router);
router.use("/healthCheck", (req, res) => {
  res.json({ msg: "is a live" });
});

class IndexRouter {
  static router = router;
}

module.exports = IndexRouter;
