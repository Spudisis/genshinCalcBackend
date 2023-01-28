const { Synchronization } = require("../models/models");

class SynchronizationService {
  async createSynchronization(name, personId) {
    const data = await Synchronization.create({ name, personId });
    return data;
  }
  async deleteSynchronization(id) {
    const data = await Synchronization.destroy({ where: { id } });
    return data;
  }
}

module.exports = new SynchronizationService();
