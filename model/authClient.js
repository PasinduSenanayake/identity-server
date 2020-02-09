

export default class AuthClient{

    constructor(entity) {
        AuthClient.model = entity.define('auth_client', {
            authClientPrimaryId: {
                type: Sequelize.STRING,
                field: 'auth_client_primary_id',
                primaryKey: true,
            },
            clientId: {
                type: Sequelize.STRING,
                field: 'client_id'
            },

            clientSecret: {
                type: Sequelize.STRING,
                field: 'client_secret'
            },
            clientType:{
                type: Sequelize.STRING,
                field: 'client_type'
            },
            status: {
                type: Sequelize.STRING,
                field: 'status'
            },

        });

        return AuthClient.model

    }

    static relationships(){

    }


}