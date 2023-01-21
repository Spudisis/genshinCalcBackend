const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const person = sequelize.define("person", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, unique: false, allowNull: false },
  role: { type: DataTypes.STRING, unique: false, defaultValue: "USER" },
});

const primogems = sequelize.define("primogems", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  countPrimogems: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  countStarglitter: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  countWishes: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  differenceCountPrimogems: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  differenceCountStarglitter: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  differenceCountWishes: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  date: { type: DataTypes.STRING, unique: false, allowNull: false },
  dateTime: { type: DataTypes.STRING, unique: false, allowNull: false },
});

const hero = sequelize.define("hero", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_start: { type: DataTypes.STRING, unique: false, allowNull: false },
  date_end: { type: DataTypes.STRING, unique: false, allowNull: true },
  name: { type: DataTypes.STRING, unique: false, allowNull: false },
  image: { type: DataTypes.STRING, unique: false, allowNull: false },
  imagePath: { type: DataTypes.BOOLEAN, unique: false, allowNull: false },
  valueDayByDay: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
  countAdd: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
  countStart: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
  countWishes: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
  countStarglitter: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
  synchValue: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
});

person.hasMany(primogems);
primogems.belongsTo(person);

person.hasMany(hero);
hero.belongsTo(person);

module.exports = {
  person,
  hero,
  primogems,
};
