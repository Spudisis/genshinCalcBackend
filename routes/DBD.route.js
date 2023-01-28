const Router = require("express");
const router = new Router();
const DBDcontroller = require("../controllers/DBD.controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/create", authMiddleware, DBDcontroller.createDayByDay);
router.post("/change", authMiddleware, DBDcontroller.changeDayByDay);
router.post("/delete", authMiddleware, DBDcontroller.deleteDBD)
module.exports = router;
