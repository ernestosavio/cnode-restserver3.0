const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config.db')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        
        // Conectar Db 
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());
        
        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Pubico
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server en port: ${process.env.PORT}`)
        });
    }

}



module.exports = Server;