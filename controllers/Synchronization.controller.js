const { Synchronization } = require("../models/models");
const ApiError = require("../exeptions/api-error");

class synchronizationController {
  async getSynchronization(req, res, next) {
    const { personId } = req.body;

    if (!personId) {
      return ApiError.BadRequest("Не задан personId");
    }
    try {
      const allSync = await Synchronization.findAll({
        where: {
          personId: personId,
        },
      });
      res.json({ allSync });
    } catch (error) {
      next(error);
    }
  }
  async editSynchronization(req, res, next) {
    const { id, value, typeValue } = req.body;
    if (!id) {
      return ApiError.BadRequest("Не задан id");
    }
    try {
      const upd = await Synchronization.update({ value, typeValue }, { where: { id } });
      res.json(upd);
    } catch (error) {
      return ApiError.BadRequest(error);
    }
  }
}

module.exports = new synchronizationController();
