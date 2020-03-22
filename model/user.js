import Sequelize from 'sequelize';

export default class User{

    constructor(entity) {
        User.model = entity.define('user', {
            userPrimaryId: {
                type: Sequelize.STRING,
                field: 'user_primary_id',
                primaryKey: true,
            },
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
            },
            userIdentifier: {
                type: Sequelize.STRING,
                field: 'user_identifier',
            },

            userClaims: {
                type: Sequelize.STRING,
                field: 'user_claim',
            },
            status: {
                type: Sequelize.STRING,
                field: 'status'
            }

        },{
            tableName:'user',
            timestamps: false
        });

        return User.model

    }

    static relationships(){

    }


}