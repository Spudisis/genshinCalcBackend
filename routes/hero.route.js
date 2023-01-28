const Router = require("express");
const router = new Router();
const HeroController = require("../controllers/hero.controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("", authMiddleware, HeroController.createHero);
router.post("/allHeros", authMiddleware, HeroController.getHeros);
router.post("/:id", authMiddleware, HeroController.getOneHero);
router.post("/hero/update", authMiddleware, HeroController.changeHero);
router.post("/delete/:id", authMiddleware, HeroController.deleteHero);

module.exports = router;
