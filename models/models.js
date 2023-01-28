const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const person = sequelize.define(
  "person",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, unique: false, allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activatedLink: { type: DataTypes.STRING, unique: false, allowNull: true },
    role: { type: DataTypes.STRING, unique: false, defaultValue: "USER" },
    uid: { type: DataTypes.INTEGER, unique: false, defaultValue: 0 },
    nickname: { type: DataTypes.STRING, unique: false, defaultValue: "" },
  },
  {
    freezeTableName: true,
  }
);

const TokenPerson = sequelize.define(
  "tokenPerson",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    refreshToken: { type: DataTypes.STRING, unique: false, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

const primogems = sequelize.define(
  "primogems",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valuePrimogems: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    valueStarglitter: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    valueWishes: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    differenceValuePrimogems: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    differenceValueStarglitter: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    differenceValueWishes: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    date: { type: DataTypes.STRING, unique: false, allowNull: false },
    dateTime: { type: DataTypes.STRING, unique: false, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

const hero = sequelize.define(
  "heroes",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_start: { type: DataTypes.STRING, unique: false, allowNull: false },
    date_end: { type: DataTypes.STRING, unique: false, allowNull: false, defaultValue: "" },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    image: { type: DataTypes.STRING, unique: false, allowNull: true },
    imagePath: { type: DataTypes.BOOLEAN, unique: false, allowNull: false },

    valueAdd: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
    valueStart: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
    valueWishes: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
  },
  {
    freezeTableName: true,
  }
);

const valueDayByDay = sequelize.define(
  "valueDayByDay",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_start: { type: DataTypes.STRING, unique: false, allowNull: false },
    date_end: { type: DataTypes.STRING, unique: false, allowNull: false, defaultValue: "" },
    value: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

const Synchronization = sequelize.define(
  "Synchronization",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    res: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
    value: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
    typeValue: { type: DataTypes.STRING, unique: false, allowNull: true },
  },
  {
    freezeTableName: true,
  }
);

const bannerWished = sequelize.define(
  "bannerWished",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    wishes: { type: DataTypes.INTEGER, unique: false, allowNull: false, defaultValue: 0 },
    isGuarantee: { type: DataTypes.BOOLEAN, unique: false, allowNull: false, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

person.hasOne(TokenPerson);
TokenPerson.belongsTo(person);

person.hasMany(primogems);
primogems.belongsTo(person);

person.hasMany(hero);
hero.belongsTo(person);

hero.hasMany(valueDayByDay);
valueDayByDay.belongsTo(hero);

Synchronization.hasOne(hero);
hero.belongsTo(Synchronization);

person.hasOne(Synchronization);
Synchronization.belongsTo(person);

person.hasOne(bannerWished);
bannerWished.belongsTo(person);

module.exports = {
  person,
  hero,
  valueDayByDay,
  Synchronization,
  bannerWished,
  TokenPerson,
  primogems,
};
