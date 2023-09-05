
import express from 'express';

//* .env
import dotenv from 'dotenv';
dotenv.config();

//*cors
import cors from 'cors';

//* socket
import { createServer } from "http";
import { Server } from "socket.io";

//*DB
import { dbConnection } from './database/config';

//*Routes
import authRouter from './routes/auth';
import todoRouter from './routes/todo';
import chatRouter from './routes/chat';

import { createChat, seed } from './controllers';

//Crear el servidor de express
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: { origin: '*' }
});


//Base de datos
dbConnection();

//CORS
app.use(cors());


//Directorio publico
app.use( express.static('public') );


//lectura y parseo del body
app.use(express.json());


//Rutas
app.use('/api/auth', authRouter );
app.use('/api/todo', todoRouter );
app.use('/api/chat', chatRouter);
app.use('/api/seed', seed);

// Socket
io.on('connection', createChat);


//Escuchar peticiones
httpServer.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
} )


