const Router = require("express");
const router = new Router();
const subCategoryController = require("../controllers/primogems.controller");

router.post("/", subCategoryController.createPrimogems);
router.get("/", subCategoryController.getPrimogems);

module.exports = router;
