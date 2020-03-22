import Sequelize from 'sequelize';
import EntityManager from '../resource/dbManager'
import AuthClient from './authClient'
export default class Application{

    constructor(entity) {
        Application.model = entity.define('application', {
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
                primaryKey: true,
                autoIncrement:true
            },
            authClientId: {
                type: Sequelize.STRING,
                field: 'auth_client_id',
            },
            applicationName: {
                type: Sequelize.STRING,
                field: 'application_name'
            },
            applicationKey: {
                type: Sequelize.STRING,
                field: 'application_key'
            },
            clientKey:{
                type: Sequelize.STRING,
                field: 'client_key'
            },
            userKey:{
                type: Sequelize.STRING,
                field: 'user_key',
                allowNull: false
            },
            status: {
                type: Sequelize.INTEGER,
                field: 'status',
                allowNull: false,
                defaultValue: 1
            },

        },{
            tableName:'application',
            timestamps: false,
        });

        return Application.model;

    }

    static relationships(){
        Application.model.hasOne(EntityManager.getEntity(AuthClient),{foreignKey: 'authClientPrimaryId'})  
    }


}