import Sequelize from 'sequelize';

export default class AuthClient{

    constructor(entity) {
        AuthClient.model = entity.define('authClient', {
            authClientPrimaryId: {
                type: Sequelize.INTEGER,
                field: 'auth_client_primary_id',
                primaryKey: true,
                autoIncrement:true
            },
            clientId: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'client_id'
            },

            clientSecret: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'client_secret'
            },
            entityType:{
                type: Sequelize.STRING,
                 allowNull: false,
                field: 'entity_type'
            },
            status: {
                type: Sequelize.INTEGER,
                field: 'status',
                allowNull: false,
                defaultValue: 1
            },

        },{
            tableName:'auth_client',
            timestamps: false,
        });

        return AuthClient.model

    }

    static relationships(){

    }


}