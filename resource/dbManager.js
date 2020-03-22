import Sequelize from 'sequelize';
import mysql2 from 'mysql2';
import dbConfigs from '../config';
export default class DbManager {
    static async init() {
        const configs = dbConfigs.databaseConfig;
        if (!DbManager.dbInstance) {
            DbManager.entityPool = {};
            DbManager.dbInstance = new Sequelize(configs.database, configs.user, configs.password,
                {
                    host: configs.host,
                    dialect: 'mysql',
                    dialectModule: mysql2,
                    logging: false,
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 60000,
                        idle: 10000,
                    },
                });
        }
        await DbManager.dbInstance.authenticate();
    }
    static getEntity(model) {
        let entity = DbManager.entityPool[model];
        if (!entity) {
            /* eslint-disable new-cap */
            entity = new model(DbManager.dbInstance);
            DbManager.entityPool[model] = entity;
            if (model.relationships) { model.relationships(); }
        } return entity;
    }


    static async executeTransaction(func) {
        const result = await DbManager.dbInstance.transaction(async (t) => func(t)); return result;
    }
}