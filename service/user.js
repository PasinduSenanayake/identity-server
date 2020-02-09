import UserDao from "../dao/user";

class UserService {

    async registerClient(userDetails) {
        const user = {
            "applicationId": userDetails.applicationId,
            "userId": userDetails.userIdentifier,
            "userClaims":JSON.stringify(userDetails.userClaims)
        };
        await UserDao.createUser(user);
    }

    async getUser(userId) {
        const user = await UserDao.getUser(userId);
        return user;
    }

    async getAllUsers(applicationId) {
        const userList = await UserDao.getAllUsers(applicationId);
        return userList;
    }

}



export default new UserService();