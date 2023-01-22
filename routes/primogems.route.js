const Router = require("express");
const router = new Router();
const subCategoryController = require("../controllers/primogems.controller");

router.post("/", subCategoryController.createPrimogems);
router.post("/rows", subCategoryController.getPrimogems);
router.post("/oneRow", subCategoryController.getLastPrimogems);
module.exports = router;
