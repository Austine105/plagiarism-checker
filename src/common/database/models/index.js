import { Sequelize } from 'sequelize';
import dbConfig from '../database.config';

const config = dbConfig;


export let sequelize;

if (config.url) {
	sequelize = new Sequelize(config.url, config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}
