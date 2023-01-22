const Router = require("express");
const router = new Router();
const HeroController = require("../controllers/hero.controller");

router.post("", HeroController.createHero);
router.post("/allHeros", HeroController.getHeros);
router.post("/:id", HeroController.getOneHero);
router.post("/hero/update", HeroController.changeHero);
router.post("/delete/:id", HeroController.deleteHero);

module.exports = router;
