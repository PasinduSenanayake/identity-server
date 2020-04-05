import winston from 'winston';

class Logger {

    constructor(){
      const errorStackTracerFormat = winston.format(error => {
        if (error.meta && error.meta instanceof Error) {
          error.message = `${error.message} ${error.meta.stack}`;
        }
        return error;
    });

         this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
              winston.format.splat(),
              errorStackTracerFormat(),
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              winston.format.simple()
              ),
            transports: [
              new winston.transports.File({ filename: 'error.log', level: 'error' }),
              new winston.transports.File({ filename: 'info.log' })
            ]
          });
          
          if (process.env.NODE_ENV !== 'production') {
            this._logger.add(new winston.transports.Console({
              format: winston.format.json()
            }));
          }
    }

   

  

    error(errorMessage,exception){
      
          let stackTrace = new Error("Internal Server Error")
        
        if(exception){
          stackTrace = exception;
        }

        this._logger.error(errorMessage, stackTrace);

    };

    info(){

    }

}
export default new Logger();