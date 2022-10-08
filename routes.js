'use strict';

import { videoDetailTiktokByUrl, oauth, redirect } from './src/controllers/tiktok.js';
import { createLog, listLogs } from './src/controllers/logging.js';
import path from "path";

const routes = (app) => {
    // Tiktok Routes
    app.route('/api/v1/tiktok/video/info').get(videoDetailTiktokByUrl);
    app.route('/tiktok/oauth').get(oauth);
    app.route('/tiktok/redirect').get(redirect);

    app.route('/api/v1/logs/create').post(createLog);
    app.route('/api/v1/logs').get(listLogs);
    app.get("/logs.html", async (req, res) => {
        res.sendFile(path.resolve("./static/logs.html"));
    });
    app.get("/js/log.js", async (req, res) => {
        res.sendFile(path.resolve("./static/js/log.js"));
    });
    app.get("/js/pagination.js", async (req, res) => {
        res.sendFile(path.resolve("./static/js/pagination.js"));
    });
}

export default routes;