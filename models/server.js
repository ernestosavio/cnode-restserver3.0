const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
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
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server en port: ${process.env.PORT}`)
        });
    }

}



module.exports = Server;