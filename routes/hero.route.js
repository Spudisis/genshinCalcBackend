const Router = require("express");
const router = new Router();
const HeroController = require("../controllers/hero.controller");

router.post("", HeroController.createHero);
router.get("", HeroController.getHeros);
router.get("/id", HeroController.getOneHero);
router.put("", HeroController.changeHero);
router.delete("", HeroController.deleteHero);

module.exports = router;
