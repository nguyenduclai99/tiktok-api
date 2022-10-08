'use strict'

import { logsCallApi } from './../models/logsCallApi.js'
import { checkDomain } from '../common/helper.js'

const createLog = async (req, res) => {
    let debug = req.body.debug

    if (!checkDomain(req) && !debug) {
        res.status(400).send({
            code: 400,
            message: 'Domain is not allowed',
            data: null
        })
    } else {
        try {
            let ip = req.ip
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;
        let created_at = new Date().toISOString();
        let headers = req.headers;
        let end_point = req.body.end_point ?? ''
        let log = {
            ip,
            headers,
            end_point,
            created_at
        }
    
        let logging = new logsCallApi(log)
        await logging.save()
        .then(doc => {
            res.status(200).send({
                code: 200,
                message: "Success",
                data: null
            })
        })
        .catch(err => {
            res.status(400).send({
                code: 400,
                message: "Bad request",
                data: null
            })
            console.error(err)
        })
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: "Server errros.",
                data: null
            })
            console.log(error)
        }
    }
}

const listLogs = async (req, res) => {
    let debug = req.query.debug
    let limit = req.query.limit
    let page = req.query.page
    let skip = 0;

    if (!limit) limit = 10;
    if (!page || page == 0) {
        page = 1
        skip = 0
    } else {
        skip = limit * (page - 1)
    };

    // if (!checkDomain(req) && !debug) {
    //     res.status(400).send({
    //         code: 400,
    //         message: 'Domain is not allowed',
    //         data: null
    //     })
    // } else {
        try {
            let total = await logsCallApi.count()
            await logsCallApi.find()
            .limit(limit)
            .skip(skip)
            .then(docs => {
                res.status(200).send({
                    code: 200,
                    message: "Success",
                    data: docs,
                    total: total,
                    page: parseInt(page),
                    next_page: parseInt(page) + 1,
                    limit: parseInt(limit),
                    total_page: Math.ceil(total/limit),
                })
            })
            .catch(err => {
                res.status(500).send({
                    code: 500,
                    message: err.message,
                    data: null,
                    total: 0,
                    page: parseInt(page),
                    next_page: parseInt(page),
                    limit: parseInt(limit),
                    total_page: 0,
                })
            })
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: error.message,
                data: null,
                total: 0,
                page: parseInt(page),
                next_page: parseInt(page),
                limit: parseInt(limit),
                total_page: 0,
            })
        }
    // }
}

export { createLog, listLogs }
