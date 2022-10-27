'use strict'

import { logsApi } from "../models/logs.js"
import { io } from './../../index.js'

const createLogV2 = async (req, res) => {
    let log = {
        params: req.body
    }

    let logging = new logsApi(log)
    logging.save()
    io.emit('logs_create', log.params)
    res.status(200).send({
        code: 200,
        message: "Success",
        data: log.params
    })
}

const listLogsV2 = async (req, res) => {
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

    try {
        let total = await logsApi.count()
        await logsApi.find()
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
}

export { createLogV2, listLogsV2 }
