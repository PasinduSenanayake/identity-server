import Sequelize from 'sequelize';

export default class ApplicationClient{

    constructor(entity) {
        ApplicationClient.model = entity.define('applicationClient', {
            applicationClientPrimaryId: {
                type: Sequelize.STRING,
                field: 'application_client_primary_id',
                primaryKey: true,
                autoIncrement:true
            },
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
                allowNull: false,
            },
            applicationClientIdentifier:{
                type: Sequelize.STRING,
                field: 'application_client_identifier',
                allowNull: false,
            },
            authClientId: {
                type: Sequelize.STRING,
                field: 'auth_client_id',
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                field: 'status',
                allowNull: false,
                defaultValue: 1
            }

        },{
            tableName:'application_client',
            timestamps: false
        });

        return ApplicationClient.model

    }

    static relationships(){

    }


}