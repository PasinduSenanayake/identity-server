
// Set the NODE_ENV to 'development' by default
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  /**
   * Your favorite port
   */

  //port: parseInt(process.env.PORT, 3000),

  port: parseInt(3000),
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  salt:parseInt(2),

  passPhrase:process.env.PASS_PHRASE || "passphrase",

  databaseConfig:{
    database:"identity_db",
    user:"root",
    password:"root",
    host:"localhost"
  }
};
