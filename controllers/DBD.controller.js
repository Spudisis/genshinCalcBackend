const { valueDayByDay } = require("../models/models");
const ApiError = require("../exeptions/api-error");

class DayByDay {
  async createDayByDay(req, res, next) {
    const { heroId, date_start, date_end } = req.body;
    if (!heroId | !date_start) {
      return ApiError.BadRequest("нет айди");
    }
    try {
      const data = await valueDayByDay.create({
        date_start,
        date_end,
        heroId,
        value: 0,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async changeDayByDay(req, res, next) {
    const { id, heroId, date_start, date_end, value } = req.body;
    if (!id) {
      return ApiError.BadRequest("нет айди");
    }
    try {
      const data = await valueDayByDay.update(
        {
          id,
          heroId,
          date_start,
          date_end,
          value,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteDBD(req, res, next) {
    const { id } = req.body;
    if (!id) {
      return ApiError.BadRequest("нет айди");
    }
    try {
      const data = await valueDayByDay.destroy({ where: { id } });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new DayByDay();
