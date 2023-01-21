const { hero } = require("../models/models");
const ApiError = require("../error/ApiError");

class heroController {
  async createHero(req, res, next) {
    const { date_start, date_end, name, image, valueDayByDay, imagePath, countStart, personId } = req.body;

    if (!date_start || !name || !image || !imagePath || !personId) {
      return next(ApiError.badRequest("Заданы не все поля"));
    }
    const newHero = await hero.create({
      date_start,
      date_end,
      name,
      image,
      imagePath,
      countStart,
      valueDayByDay,
      personId,
    });
    res.json(newHero);
  }
  async getHeros(req, res, next) {
    const { personId } = req.body;

    if (!personId) {
      return next(ApiError.badRequest("Не задан personId"));
    }
    const rows = await hero.findAll({
      where: { personId: personId },
    });
    res.json(rows);
  }
  async getOneHero(req, res, next) {
    const { id } = req.query;
    const { personId } = req.body;
    if (Object.keys(req.query).length !== 1) {
      return next(ApiError.badRequest("Неверный запрос"));
    }
    if (!personId || !id) {
      return next(ApiError.badRequest("Не задан personId"));
    }
    const row = await hero.findOne({
      where: { personId: personId, id: id },
    });
    if (!row) {
      return next(ApiError.badRequest("Персонажа не существует"));
    }
    res.json(row);
  }
  async changeHero(req, res, next) {
    const {
      id,
      date_start,
      date_end,
      name,
      image,
      imagePath,
      valueDayByDay,
      countAdd,
      countStart,
      countWishes,
      countStarglitter,
      synchValue,
    } = req.body;

    const updRow = await hero.update(
      {
        date_start,
        date_end,
        name,
        image,
        imagePath,
        valueDayByDay,
        countAdd,
        countStart,
        countWishes,
        countStarglitter,
        synchValue,
      },
      { where: { id: id } }
    );
    if (updRow === 0) {
      return next(ApiError.badRequest("Персонажа не существует"));
    }
    res.json(updRow);
  }

  async deleteHero(req, res, next) {
    const { id } = req.body;
    const deleteRow = await hero.destroy({ where: { id: id } });

    res.json(deleteRow);
  }
}

module.exports = new heroController();
