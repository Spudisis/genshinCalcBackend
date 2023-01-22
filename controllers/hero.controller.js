const { hero } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class heroController {
  async createHero(req, res, next) {
    const { date_start, date_end, name, image, valueDayByDay, imagePath, countStart, personId } = req.body;

    if (!date_start || !name || !personId) {
      return next(ApiError.badRequest("Заданы не все поля"));
    }

    if (imagePath == "false") {
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
      return res.json(newHero);
    }
    const { img } = req.files;
    console.log(img);
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    try {
      const newHero = await hero.create({
        date_start,
        date_end,
        name,
        image: fileName,
        imagePath,
        countStart,
        valueDayByDay,
        personId,
      });
      res.json(newHero);
    } catch (error) {
      return next(ApiError.badRequest("ошибка при создании"));
    }
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
    const { id } = req.params;
    const { personId } = req.body;

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

    if (!id) {
      return next(ApiError.badRequest("id not found"));
    }
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
    const { id } = req.params;
    const { personId } = req.body;
    const row = await hero.findOne({
      where: { id: id, personId: personId },
    });
    if (!row) {
      return next(ApiError.badRequest("Персонаж не найден"));
    }
    if (row.imagePath) {
      try {
        fs.unlinkSync(path.resolve(__dirname, "..", "static", row.image));
      } catch (error) {
        return next(ApiError.badRequest("Ошибка при удалении"));
      }
    }

    const deleteRow = await hero.destroy({ where: { id: id, personId: personId } });

    res.json(deleteRow);
  }
}

module.exports = new heroController();
