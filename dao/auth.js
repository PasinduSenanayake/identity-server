
class AuthDao {


    getAuthClient() {
        return {
            "clientSecret":"$2b$04$OrYz2Vtr8p8eygt2Kk5xTOpAJfM1sRgfNDTJ9xOpuA4oJJFcpKbh."
        }
    }
    createAuthClient(authClient){
        return {"authClientPrimaryId":10}

    }


}

export default new AuthDao();
