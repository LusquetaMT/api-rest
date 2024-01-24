import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';
import Costumer from '../models/Costumer';
import User from '../models/User';
import Picture from '../models/Picture';

const models = [Costumer, User, Picture];

const connection = new Sequelize(dataBaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
