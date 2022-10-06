'use strict';

import { logsCallApi } from './../models/logsCallApi.js'

const listDomainAccess = ['https://1989smedia.com','https://www.mualikegiare.xyz', 'https://mualikegiare.xyz'];

const checkDomain = (req) => {
    let origin = req.get('origin')
    return listDomainAccess.includes(origin)
}

const logCallApi = async (req) => {
    let ip = req.ip
        || req.connection.remoteAddress
        || req.socket.remoteAddress
        || req.connection.socket.remoteAddress;
    let created_at = new Date().toISOString();
    let headers = req.headers
    let end_point = req.url
    let log = {
        ip,
        headers,
        end_point,
        created_at
    }

    let logging = new logsCallApi(log)
    await logging.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        // console.error(err)
    })
}

const uuidv4 = () => {
    let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
    return [u.substr(0,8), u.substr(8,4), '4000-8' + u.substr(13,3), u.substr(16,12)].join('-');
}

export { checkDomain, logCallApi }
