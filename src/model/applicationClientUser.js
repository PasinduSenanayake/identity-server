import Sequelize from 'sequelize';

export default class ApplicationClientUser{

    constructor(entity) {
        ApplicationClientUser.model = entity.define('applicationClientUser', {
            applicationClientUserPrimaryId: {
                type: Sequelize.STRING,
                field: 'application_client_user_primary_id',
                primaryKey: true,
                autoIncrement:true
            },
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
            },

            applicationClientPrimaryId: {
                type: Sequelize.STRING,
                field: 'application_client_primary_id',
            },
            applicationUserPrimaryId: {
                type: Sequelize.STRING,
                field: 'application_user_primary_id',
            },
            status: {
                type: Sequelize.STRING,
                field: 'status',
                defaultValue:1
            }

        },{
            tableName:'application_client_user',
            timestamps: false
        });

        return ApplicationClientUser.model

    }

    static relationships(){

    }


}