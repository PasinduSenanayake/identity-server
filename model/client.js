

export default class Client{

    constructor(entity) {
        Client.model = entity.define('client', {
            clientPrimaryId: {
                type: Sequelize.STRING,
                field: 'client_primary_id',
                primaryKey: true,
            },
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
            },
            authClientId: {
                type: Sequelize.STRING,
                field: 'auth_client_id',
            },
            status: {
                type: Sequelize.STRING,
                field: 'status'
            }

        });

        return Client.model

    }

    static relationships(){

    }


}