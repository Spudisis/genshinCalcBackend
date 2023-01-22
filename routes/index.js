const Router = require("express");
const router = new Router();
const person = require("./person.route");
const primogems = require("./primogems.route");
const heros = require("./hero.route");

router.use("/person", person);
router.use("/primogems", primogems);
router.use("/heros", heros);

module.exports = router;
