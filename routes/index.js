const Router = require("express");
const router = new Router();
const person = require("./person.route");
const primogems = require("./primogems.route");
const heros = require("./hero.route");
const sync = require("./Synchronization.route");
const dbd = require("./DBD.route");

router.use("/person", person);
router.use("/primogems", primogems);
router.use("/heros", heros);
router.use("/sync", sync);
router.use("/dbd", dbd);

module.exports = router;
