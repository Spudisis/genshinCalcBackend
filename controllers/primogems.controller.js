const { primogems } = require("../models/models");
const ApiError = require("../error/ApiError");

class primogemsController {
  async createPrimogems(req, res) {
    const {
      countPrimogems,
      countStarglitter,
      countWishes,
      differenceCountPrimogems,
      differenceCountStarglitter,
      differenceCountWishes,
      date,
      dateTime,
      personId,
    } = req.body;

    const newPrimogemsRow = await primogems.create({
      countPrimogems,
      countStarglitter,
      countWishes,
      differenceCountPrimogems,
      differenceCountStarglitter,
      differenceCountWishes,
      date,
      dateTime,
      personId,
    });
    res.json(newPrimogemsRow);
  }
  async getPrimogems(req, res, next) {
    const { personId, offset, limit } = req.body;
    const page = (offset - 1) * limit;
    if (!personId || !offset || !limit) {
      return next(ApiError.badRequest("Не задан personId или rowsOnPage"));
    }
    const { count, rows } = await primogems.findAndCountAll({
      where: { personId: personId },
      order: [["createdAt", "DESC"]],
      offset: page,
      limit: limit,
    });
    res.json({ count, rows });
  }
}

module.exports = new primogemsController();
