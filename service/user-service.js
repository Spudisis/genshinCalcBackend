const { person } = require("../models/models");
const ApiError = require("../exeptions/api-error");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const mailService = require("./mail-service");
const TokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const uuid = require("uuid");

class UserService {
  async registration(login, password) {
    if (!login || !password) {
      throw ApiError.BadRequest("Не задан NAME или PASS");
    }
    const candidate = await person.findOne({ where: { login } });

    if (candidate) {
      throw ApiError.BadRequest("Email существует");
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const activatedLink = uuid.v4();

    const newUser = await person.create({ login, password: hashPassword, activatedLink, isActivated: false });

    await mailService.sendActivationMail(login, `${process.env.SERVER_URL}/api/person/activate/${activatedLink}`);

    const userDto = new UserDto(newUser);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activatedLink) {
    const user = await person.findOne({ where: { activatedLink } });
    if (!user) {
      throw ApiError.BadRequest("Пользователя не существует");
    }
    await person.update({ isActivated: true }, { where: { activatedLink } });
  }
  async login(login, password) {
    const user = await person.findOne({ where: { login } });
    if (!user) {
      throw ApiError.BadRequest("Не найден пользователь");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await person.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async getAllUsers(nickname) {
    if (nickname) {
      const users = await person.findAll({
        attributes: ["id", "nickname"],
        where: {
          nickname: {
            [Op.substring]: nickname,
          },
          isActivated: {
            [Op.is]: true,
          },
        },
      });
      return users;
    } else {
      const users = await person.findAll({
        attributes: ["id", "nickname"],
        where: {
          nickname: {
            [Op.not]: "",
          },
          isActivated: {
            [Op.is]: true,
          },
        },
      });
      return users;
    }
  }
}

module.exports = new UserService();
