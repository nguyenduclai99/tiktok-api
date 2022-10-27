import express from "express";
import dotenv from "dotenv";
import cookieParser from'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes.js';
import { connectDB } from './src/config/database.js'
import http from 'http';
import { Server} from 'socket.io';
import os from 'os';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}));

connectDB()

const CLIENT_KEY = process.env.CLIENT_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const port = process.env.PORT || 3000;

const server = http.createServer(app)
const io = new Server(server, {
    transports:['polling'],
    cors:{
        cors: {
            origin: `http://localhost:${port}`
        }
    }
})


io.on('connection', (socket) => {
    console.log('A user is connected');
  
    socket.on('message', (message) => {
      console.log(`message from ${socket.id} : ${message}`);
    })
  
    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} disconnected`);
    })
})

export { io };

routes(app)

server.listen(port, () =>
    console.log(`Server is listening on port ${port}. http://localhost:${port}`)
);
