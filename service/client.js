import ClientDao from "../dao/client";

class ClientService {

    async registerClient(clientDetials, authDetails) {
        const client = {
            "applicationId": clientDetials.applicationId,
            "authClientId": authDetails.authClientPrimaryId,
        };
        await ClientDao.createClient(client);
    }

    async getClient(clientId) {
        const client = await ClientDao.getClient(clientId);
        return client;
    }

    async getAllClients(applicationId) {
        const clientsList = await ClientDao.getAllClients(applicationId);
        return clientsList;
    }


}


export default new ClientService();