const Router = require("express");
const router = new Router();
const PersonController = require("../controllers/person.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", PersonController.registration);
router.post("/login", PersonController.login);
router.get("/auth", authMiddleware, PersonController.check);

module.exports = router;
