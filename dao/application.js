
class ApplicationDao {


    getApplication() {
        return {"authClientId":10,"applicationKey":"62dc904e45f231259140e2406a19d88cc8a865f298cb98ce5780986f3aac332b5423e87a4d4a34e80b10fc9829a924fd2f99b1129fa73f6a99c84e4273ef42d9395ae3c083420d86f12643ae970946d2baf082ff992abc819fd274d2297ec18a280573f36554a9d8093cc934d3a02f0e8d4be53678eb"}
    }

    createApplication(){

    }

    getApplicationByAuthClientId(authClientId){
        return {"applicationId":"121"}
    }


}

export default new ApplicationDao();