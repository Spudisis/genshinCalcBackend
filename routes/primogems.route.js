const Router = require("express");
const router = new Router();
const subCategoryController = require("../controllers/primogems.controller");
const authMiddleware = require("../middleware/auth-middleware");
router.post("/", authMiddleware, subCategoryController.createPrimogems);
router.post("/rows", authMiddleware, subCategoryController.getPrimogems);
router.post("/oneRow", authMiddleware, subCategoryController.getLastPrimogems);

module.exports = router;
