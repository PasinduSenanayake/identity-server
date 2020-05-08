import Sequelize from 'sequelize';

export default class ApplicationResource{

    constructor(entity) {
        ApplicationResource.model = entity.define('applicationResource', {
            applicationResourcePrimaryId: {
                type: Sequelize.STRING,
                field: 'application_resource_primary_id',
                primaryKey: true,
                autoIncrement: true
            },
            applicationResourceIdentifier: {
                type: Sequelize.STRING,
                field: 'application_resource_identifer',
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
            tableName:'application_resource',
            timestamps: true
        });

        return ApplicationResource.model

    }

    static relationships(){
       
    }


}