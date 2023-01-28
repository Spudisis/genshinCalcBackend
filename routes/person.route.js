const Router = require("express");
const router = new Router();
const PersonController = require("../controllers/person.controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/registration", PersonController.registration);
router.post("/login", PersonController.login);
router.post("/logout", PersonController.logout);
router.get("/activate/:link", PersonController.activate);
router.get("/refresh", PersonController.refresh);
router.post("/users", authMiddleware, PersonController.getUsers);

module.exports = router;
