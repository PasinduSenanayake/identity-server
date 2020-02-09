

export default class Application{

    constructor(entity) {
        Application.model = entity.define('application', {
            applicationId: {
                type: Sequelize.STRING,
                field: 'application_id',
                primaryKey: true,
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
                field: 'user_key'
            },
            status: {
                type: Sequelize.STRING,
                field: 'status'
            },

        });

        return Application.model

    }

    static relationships(){

    }


}