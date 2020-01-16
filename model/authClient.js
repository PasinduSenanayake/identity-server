

export default class AuthClient{

    constructor(entity) {
        AuthClient.model = entity.define('auth_client', {
            entityId: {
                type: Sequelize.STRING,
                field: 'entity_id',
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
            clientAuthorizer:{
                type:Sequelize.STRING,
                field: 'client_authorizer'
            },
            userAuthorizer:{
                type: Sequelize.STRING,
                field: 'user_authorizer'

            }

        });

        return AuthClient.model

    }

    static relationships(){

    }


}