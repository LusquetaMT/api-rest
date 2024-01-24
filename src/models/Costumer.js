import Sequelize, { Model } from 'sequelize';

export default class Costumer extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The name field must not be empty and contain between 3 and 255 characters',
          },
        },
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The last name field must not be empty and contain between 3 and 255 characters',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'The provided email already exists',
        },
        validate: {
          isEmail: {
            msg: 'Invalid or empty email',
          },
        },
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date(Date.now()),
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Picture, { foreignKey: 'costumer_id' });
  }
}
