'use strict';

import { videoDetailTiktokByUrl, oauth, redirect } from './src/controllers/tiktok.js';
import { createLog, listLogs } from './src/controllers/logging.js';
const routes = (app) => {
    // Tiktok Routes
    app.route('/api/v1/tiktok/video/info').get(videoDetailTiktokByUrl);
    app.route('/tiktok/oauth').get(oauth);
    app.route('/tiktok/redirect').get(redirect);

    app.route('/api/v1/logs/create').post(createLog);
    app.route('/api/v1/logs').get(listLogs);
}

export default routes;