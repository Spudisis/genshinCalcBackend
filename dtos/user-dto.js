module.exports = class UserDto {
  login;
  id;
  isActivated;
  constructor(model) {
    this.login = model.login;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
};
