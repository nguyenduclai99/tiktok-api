import express from "express";
import fetch from 'node-fetch';
import dotenv from "dotenv";
import cookieParser from'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes.js';
import { connectDB } from './src/config/database.js'

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

routes(app)

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is listening on port ${port}. http://localhost:${port}`)
);
