const { person } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, { expiresIn: "72h" });
};

class PersonController {
  async registration(req, res, next) {
    const { login, password, role } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("Не задан NAME или PASS"));
    }
    const candidate = await person.findOne({ where: { login } });
    if (candidate) {
      return next(ApiError.badRequest("Email существует"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = await person.create({ login, role, password: hashPassword });
    const token = generateJwt(newUser.id, newUser.login, newUser.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { login, password } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("Не задан NAME или PASS"));
    }
    const user = await person.findOne({ where: { login } });
    if (!user) {
      return next(ApiError.badRequest("Email не существует"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Неверный пароль"));
    }
    const token = generateJwt(user.id, user.login, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.login, req.user.role);
    res.json({ token });
  }
}

module.exports = new PersonController();
