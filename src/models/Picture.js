import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Picture extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The field must not be empty',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'The field must not be empty',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'pictures',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Costumer, { foreignKey: 'costumer_id' });
  }
}
