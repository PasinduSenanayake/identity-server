import Sequelize from 'sequelize';

export default class ApplicationResourceUser{

    constructor(entity) {
        ApplicationResourceUser.model = entity.define('applicationResourceUser', {
            applicationResourceUserPrimaryId: {
                type: Sequelize.STRING,
                field: 'application_resource_user_primary_id',
                primaryKey: true,
                autoIncrement:true
            },
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
            },

            applicationResourcePrimaryId: {
                type: Sequelize.STRING,
                field: 'application_resource_primary_id',
            },
            applicationUserPrimaryId: {
                type: Sequelize.STRING,
                field: 'application_user_primary_id',
            },
            userClaims:{
                type: Sequelize.STRING,
                field:'user_claims'
            },
            status: {
                type: Sequelize.STRING,
                field: 'status',
                defaultValue:1
            }

        },{
            tableName:'application_resource_user',
            timestamps: false
        });

        return ApplicationResourceUser.model

    }

    static relationships(){

    }


}