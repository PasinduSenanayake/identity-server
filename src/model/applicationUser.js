import Sequelize from 'sequelize';

export default class ApplicationUser{

    constructor(entity) {
        ApplicationUser.model = entity.define('applicationUser', {
            applicationUserPrimaryId: {
                type: Sequelize.STRING,
                field: 'application_user_primary_id',
                primaryKey: true,
                autoIncrement:true
            },
            applicationUserIdentifier:{
                type: Sequelize.STRING,
                field: 'application_user_identifier',
            },
            authClientId: {
                type: Sequelize.STRING,
                field: 'auth_client_id',
            },
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
            },
            status: {
                type: Sequelize.STRING,
                field: 'status',
                defaultValue:1
            }

        },{
            tableName:'application_user',
            timestamps: true
        });

        return ApplicationUser.model

    }

    static relationships(){

    }


}