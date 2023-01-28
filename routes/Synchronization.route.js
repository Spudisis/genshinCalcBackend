const Router = require("express");
const router = new Router();
const PersonController = require("../controllers/Synchronization.controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/all", authMiddleware, PersonController.getSynchronization);
router.post("/edit", authMiddleware, PersonController.editSynchronization);

module.exports = router;
