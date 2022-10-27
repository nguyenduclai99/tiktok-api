'use strict';

import { videoDetailTiktokByUrl, oauth, redirect } from './src/controllers/tiktok.js';
import { createLog, listLogs } from './src/controllers/logging.js';
import { createLogV2, listLogsV2 } from './src/controllers/logs.js';

import path from "path";

const routes = (app) => {
    // Tiktok Routes
    app.route('/api/v1/tiktok/video/info').get(videoDetailTiktokByUrl);
    app.route('/tiktok/oauth').get(oauth);
    app.route('/tiktok/redirect').get(redirect);

    app.route('/api/v1/logs/create').post(createLog);
    app.route('/api/v1/logs').get(listLogs);

    app.route('/api/v2/logs/create').post(createLogV2);
    app.route('/api/v2/logs').get(listLogsV2);

    app.get("/logs.html", async (req, res) => {
        res.sendFile(path.resolve("./static/logs.html"));
    });
    app.get("/js/log.js", async (req, res) => {
        res.sendFile(path.resolve("./static/js/log.js"));
    });
    app.get("/js/pagination.js", async (req, res) => {
        res.sendFile(path.resolve("./static/js/pagination.js"));
    });

    app.get('/chat.html', async (req, res) => {
        res.sendFile(path.resolve("./static/chat.html"));
    })
    app.get("/socket.io/socket.io.js", async (req, res) => {
        res.sendFile(path.resolve("./node_modules/socket.io/client-dist/socket.io.js"));
    });
}

export default routes;