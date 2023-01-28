const { valueDayByDay } = require("../models/models");
const ApiError = require("../exeptions/api-error");
class ServiceValueDBD {
  async createValueDBD(date_start, date_end, value, heroId) {
    try {
      const data = await valueDayByDay.create({ date_start, date_end, value, heroId });
      return data;
    } catch (error) {
      return ApiError.BadRequest("ошибка при создании");
    }
  }
  async deleteValueDBD(heroId, personId) {
    try {
      const data = await valueDayByDay.destroy({ where: { heroId } });
      return data;
    } catch (error) {
      return ApiError.BadRequest("ошибка при создании");
    }
  }
}

module.exports = new ServiceValueDBD();
