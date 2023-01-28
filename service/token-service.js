const jwt = require("jsonwebtoken");
const { TokenPerson } = require("../models/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, { expiresIn: "30d" });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
      return userData;
    } catch (error) {
      return null;
    }
  }
  async saveToken(personId, refreshToken) {
    const tokenData = await TokenPerson.findOne({ where: { personId: personId } });

    if (tokenData) {
      return TokenPerson.update({ refreshToken: refreshToken }, { where: { personId } });
    }
    const token = await TokenPerson.create({ personId, refreshToken, isActivated: false });

    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await TokenPerson.destroy({ where: { refreshToken } });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await TokenPerson.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
