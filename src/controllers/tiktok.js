'use strict'

import { configAxiosTiktok } from '../config/config.js';
import { checkDomain } from '../common/helper.js'
import axios from 'axios';

const client = axios.create(configAxiosTiktok);
const tiktokApi = axios.create({
    baseURL: process.env.TIKTOK_OPEN_API
})
const CLIENT_KEY = process.env.CLIENT_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const videoDetailTiktokByUrl = async (req, res) => {
    let url = req.query.url
    let debug = req.query.debug

    if (!checkDomain(req) && !debug) {
        res.status(400).send({
            code: 400,
            message: 'Domain name is not allowed',
            data: null
        })
    } else {
        await client.get('/api', {
            params: {
                url
            }
        }).then(function (response) {
            let status = 200;
            let data = response.data
            if (response.data.status == "failed") {
                status = 400
                data = {
                    code: status,
                    message: `The ${url} format is invalid`,
                    data: null
                }
            }
            res.status(status).send({
                code: status,
                message: "Success",
                data: data
            })
        })
        .catch(function (error) {
            res.status(500).send({
                code: 500,
                message: "The system is busy, please try again later.",
                data: null
            })
        })
    }
    
}

const oauth = (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    const redirect_uri = req.hostname + '/tiktok/redirect';
    res.cookie('csrfState', csrfState, { maxAge: 60000 });


    let url = process.env.TIKTOK_URI + '/auth/authorize/';

    url += '?client_key=' + CLIENT_KEY;
    url += '&scope=user.info.basic,video.list,video.upload';
    url += '&response_type=code';
    url += '&redirect_uri=' + redirect_uri;
    url += '&state=' + csrfState;

    res.redirect(url);
}

const redirect = async (req, res) => {
    const { code, state } = req.query;
    const { csrfState } = req.cookies;

    if (state !== csrfState) {
        res.status(422).send('Invalid state');
        return;
    }

    let url_access_token = '/oauth/access_token/';
    url_access_token += '?client_key=' + CLIENT_KEY;
    url_access_token += '&client_secret=' + CLIENT_SECRET;
    url_access_token += '&code=' + code;
    url_access_token += '&grant_type=authorization_code';

    tiktokApi.post(url_access_token)
    .then(function (response) {
        let data = response.data
        res.status(response.status).send({
            code: status,
            message: "Success",
            data: data
        })
    })
    .catch(function (error) {
        res.status(500).send({
            code: 500,
            message: error.message,
            data: null
        })
    })
}

export { videoDetailTiktokByUrl, oauth, redirect }