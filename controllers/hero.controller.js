const { hero, Synchronization, valueDayByDay } = require("../models/models");
const ApiError = require("../exeptions/api-error");

const ValueDBD = require("../service/valueDayByDay-service");
const HeroService = require("../service/hero-service");
const SynchronizationService = require("../service/synchronization-service");

const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class heroController {
  async createHero(req, res, next) {
    const { date_start, date_end, name, image, valueDayByDay, imagePath, valueStart, personId } = req.body;

    if (!date_start || !name || !personId) {
      return next(ApiError.badRequest("Заданы не все поля"));
    }
    const data = await SynchronizationService.createSynchronization(name, personId);
    if (imagePath == "false") {
      try {
        const newHero = await hero.create({
          date_start,
          date_end,
          name,
          image,
          imagePath,
          valueStart,
          personId,
          SynchronizationId: data.id,
        });
        console.log(newHero);
        await ValueDBD.createValueDBD(date_start, date_end, valueDayByDay, newHero.dataValues.id);
        return res.json(newHero);
      } catch (error) {
        ApiError.BadRequest(error);
      }
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
        SynchronizationId: data.id,
      });
      await ValueDBD.createValueDBD(date_start, date_end, valueDayByDay, newHero.id);
      res.json(newHero);
    } catch (error) {
      ApiError.BadRequest(error);
    }
  }
  async getHeros(req, res, next) {
    try {
      const { personId } = req.body;
      console.log(personId);

      const userData = await HeroService.getHeroes(personId);

      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getOneHero(req, res, next) {
    const { id } = req.params;
    const { personId } = req.body;

    if (!personId || !id) {
      ApiError.BadRequest("Не задан personId");
    }
    const row = await hero.findOne({
      where: { personId: personId, id: id },
      include: [
        {
          model: Synchronization,
        },
        {
          model: valueDayByDay,
          where: {
            heroId: id,
          },
        },
      ],
    });
    if (!row) {
      return next(ApiError.badRequest("Персонажа не существует"));
    }
    res.json(row);
  }
  async changeHero(req, res, next) {
    const { id, date_start, date_end, name, image, imagePath, valueAdd, valueStart, valueWishes } = req.body;

    if (!id) {
      ApiError.BadRequest("id not found");
    }
    const updRow = await hero.update(
      {
        date_start,
        date_end,
        name,
        image,
        imagePath,
        valueAdd,
        valueStart,
        valueWishes,
      },
      { where: { id: id } }
    );
    if (updRow === 0) {
      ApiError.BadRequest("Персонажа не существует");
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
      return ApiError.BadRequest("Персонаж не найден");
    }
    if (row.imagePath) {
      try {
        fs.unlinkSync(path.resolve(__dirname, "..", "static", row.image));
      } catch (error) {
        return ApiError.BadRequest("Ошибка при удалении");
      }
    }
    try {
      await ValueDBD.deleteValueDBD(id, personId);
      const row = await hero.findOne({ where: { id: id, personId: personId } });
      const deleteRow = await hero.destroy({ where: { id: id, personId: personId } });
      await SynchronizationService.deleteSynchronization(row.SynchronizationId);
      res.json(deleteRow);
    } catch (error) {
      return ApiError.BadRequest("Ошибка при удалении");
    }
  }
}

module.exports = new heroController();
