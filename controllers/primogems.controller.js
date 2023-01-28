const { primogems } = require("../models/models");
const ApiError = require("../exeptions/api-error");

class primogemsController {
  async createPrimogems(req, res, next) {
    const {
      date,
      dateTime,
      valuePrimogems,
      valueWishes,
      valueStarglitter,
      differenceValuePrimogems,
      differenceValueWishes,
      differenceValueStarglitter,
      personId,
    } = req.body;

    try {
      if (!date | !dateTime | !personId) {
        return ApiError.BadRequest("ошибка при добавлении");
      }

      const newPrimogemsRow = await primogems.create({
        date,
        dateTime,
        valuePrimogems,
        valueWishes,
        valueStarglitter,
        differenceValuePrimogems,
        differenceValueWishes,
        differenceValueStarglitter,
        personId,
      });
      return res.json(newPrimogemsRow);
    } catch (error) {
      next(error);
    }
  }
  async getPrimogems(req, res, next) {
    const { personId, offset, limit } = req.body;
    const page = (offset - 1) * limit;
    if (!personId || !offset || !limit) {
      return ApiError.BadRequest("Не задан personId или rowsOnPage");
    }
    const { count, rows } = await primogems.findAndCountAll({
      where: { personId: personId },
      order: [["createdAt", "DESC"]],
      offset: page,
      limit: limit,
    });
    res.json({ count, rows });
  }
  async getLastPrimogems(req, res, next) {
    const { personId } = req.body;
    if (!personId) {
      return ApiError.BadRequest("Не задан personId");
    }
    const row = await primogems.findAll({
      limit: 1,
      where: {
        personId,
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(row);
  }
}

module.exports = new primogemsController();
