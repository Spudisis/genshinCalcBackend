const { hero, valueDayByDay, Synchronization } = require("../models/models");
const ApiError = require("../exeptions/api-error");

class HeroService {
  async getHeroes(personId) {
    if (!personId) {
      ApiError.BadRequest("нет personId");
    }
    const rows = await hero.findAll({
      where: { personId },
      include: [
        {
          model: Synchronization,
        },
        {
          model: valueDayByDay,

          attributes: ["id", "value", "date_start", "date_end"],
        },
      ],
    });

    return rows;
  }
}

module.exports = new HeroService();
