import express from "express";
import fetch from 'node-fetch';
import dotenv from "dotenv";
import cookieParser from'cookie-parser';
import cors from 'cors';
import routes from './routes.js';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors());

const CLIENT_KEY = process.env.CLIENT_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

routes(app)

app.get('/oauth', (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    const redirect_uri = 'https://' + req.hostname + '/redirect';
    res.cookie('csrfState', csrfState, { maxAge: 60000 });


    let url = 'https://www.tiktok.com/auth/authorize/';

    url += '?client_key=' + CLIENT_KEY;
    url += '&scope=user.info.basic,video.list,video.upload';
    url += '&response_type=code';
    url += '&redirect_uri=' + redirect_uri;
    url += '&state=' + csrfState;

    res.redirect(url);
})

app.get('/redirect', (req, res) => {
    const { code, state } = req.query;
    const { csrfState } = req.cookies;

    if (state !== csrfState) {
        res.status(422).send('Invalid state');
        return;
    }

    let url_access_token = 'https://open-api.tiktok.com/oauth/access_token/';
    url_access_token += '?client_key=' + CLIENT_KEY;
    url_access_token += '&client_secret=' + CLIENT_SECRET;
    url_access_token += '&code=' + code;
    url_access_token += '&grant_type=authorization_code';

    fetch(url_access_token, {method: 'post'})
        .then(res => res.json())
        .then(json => {
            res.send(json);
        });
})

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is listening on port ${port}. http://localhost:${port}`)
);
